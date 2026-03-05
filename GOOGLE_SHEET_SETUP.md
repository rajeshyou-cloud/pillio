# Google Sheet Integration Setup

This guide walks you through connecting the contact form to a Google Sheet using a Google Apps Script Web App.

---

## Step 1 — Create or open a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. Name it e.g. **Pillio Contact Leads**.
3. In Row 1, add these headers exactly:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Service | Message |

---

## Step 2 — Create a Google Apps Script

1. In the sheet, click **Extensions → Apps Script**.
2. Delete the default code and paste the following:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name    || '',
      data.email   || '',
      data.phone   || '',
      data.service || '',
      data.message || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (Ctrl+S / ⌘S). Name the project e.g. **PillioContactWebhook**.

---

## Step 3 — Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to **Type** and choose **Web app**.
3. Set:
   - **Description**: `Contact Form Webhook`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy**.
5. Authorize the script when prompted.
6. Copy the **Web app URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

---

## Step 4 — Add the URL to your environment

Create a `.env.local` file in the project root (copy from `.env.local.example`) and set:

```
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbwLiOmCpjV_Jz_DHZnmnpT-cXS5ct2HGmegN1r29F43hVrqw5rLgT-WMYDI3kHnSaJM/exec
```

Restart your Next.js dev server after saving the file.

---

## Re-deploying after script changes

If you edit the Apps Script code later, create a **new deployment version** (Deploy → Manage deployments → Edit → select "New version"). The URL stays the same.

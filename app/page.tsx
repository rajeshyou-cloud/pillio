'use client'

import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  ArrowRight,
  Bot,
  Building2,
  Cpu,
  LineChart,
  Mail,
  MapPin,
  Phone,
  Smartphone,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import PillioLogo from './components/PillioLogo'

const statItems = [
  { numeric: 23, suffix: '+', label: 'Projects Delivered' },
  { numeric: 7,  suffix: '+', label: 'Happy Clients' },
  { numeric: 5,  suffix: '+', label: 'Years Experience' },
  { numeric: 4,  suffix: '+', label: 'Core Team Members' },
]

const trustItems = [
  '🤖 Agentic AI is reshaping enterprise workflows',
  '📈 Hyper-personalisation drives 3× email open rates',
  '⚡ LLM-powered RPA cuts process time by 60%',
  '🎯 First-party data replaces third-party cookies',
  '🔗 AI agents now handle end-to-end lead nurturing',
  '📊 Predictive analytics fuels smarter ad spend',
  '🚀 No-code AI tools put automation in every team',
  '🌐 Omnichannel marketing lifts conversion by 35%',
  '🧠 Retrieval-Augmented Generation elevates chatbots',
  '📱 Short-form video delivers the highest organic reach',
  '🔍 AI-driven SEO adapts in real-time to search intent',
  '💡 AutoML democratises machine learning for SMEs',
]

const heroPills = [
  { emoji: '🚀', label: 'Product Development' },
  { emoji: '🤖', label: 'AI Automations' },
  { emoji: '📈', label: 'Digital Marketing' },
]

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const motionVal = useMotionValue(0)
  const rounded = useTransform(motionVal, (v) => `${Math.floor(v)}${suffix}`)
  useEffect(() => {
    if (isInView) {
      animate(motionVal, target, { duration: 1.8, ease: 'easeOut' })
    }
  }, [isInView, motionVal, target])
  return <motion.span ref={ref}>{rounded}</motion.span>
}

const services = [
  {
    title: 'Software Development',
    desc: 'Custom software solutions tailored to your business needs, from enterprise suites to mobile experiences.',
    icon: Cpu,
  },
  {
    title: 'Digital Consulting',
    desc: 'Strategic guidance to align technology roadmaps with measurable business outcomes.',
    icon: Building2,
  },
  {
    title: 'Mobile App Development',
    desc: 'Native and cross-platform mobile experiences built for performance, usability, and scale across iOS and Android.',
    icon: Smartphone,
  },
  {
    title: 'AI Automations',
    desc: 'Intelligent automation solutions powered by AI and machine learning to reduce manual effort and drive smarter decisions.',
    icon: Bot,
  },
  {
    title: 'Data Analytics',
    desc: 'Actionable insights using modern analytics pipelines and real-time business intelligence.',
    icon: LineChart,
  },
  {
    title: 'IT Staffing',
    desc: 'Expert talent acquisition and technical staffing to accelerate project delivery.',
    icon: Users,
  },
]

const products = [
  {
    title: 'TruckFirst',
    tag: 'Truck Ecosystem',
    desc: 'An end-to-end digital platform purpose-built for the trucking industry — fleet management, logistics coordination, compliance tracking, and driver operations in one unified system.',
  },
  {
    title: 'SME-Digi',
    tag: 'Digital Marketing',
    desc: 'A growth ecosystem for small and medium enterprises to manage campaigns, automate social presence, track leads, and measure ROI across every digital channel.',
  },
  {
    title: 'Enterprise Workflow Automations',
    tag: 'Process Automation',
    desc: 'Intelligent workflow automation that connects your people, tools, and data — eliminating manual bottlenecks and accelerating cross-team operations at enterprise scale.',
  },
  {
    title: 'Coming Soon',
    tag: 'New Product',
    desc: 'We are building something new. Stay tuned for our next innovation — designed to solve real-world challenges with modern technology.',
    placeholder: true,
  },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const contactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email'),
  phone:   z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})
type ContactForm = z.infer<typeof contactSchema>

export default function PortalHome() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) })

  const onContactSubmit = async (data: ContactForm) => {
    setSubmitStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
    }
  }
  return (
    <div className="min-h-screen text-[var(--text-ink)] selection:bg-sky-200 selection:text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="site-shell flex h-16 items-center justify-between">
          <PillioLogo href="#home" />
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            <Link href="#about" className="transition hover:text-pillio-navy">About</Link>
            <Link href="#services" className="transition hover:text-pillio-navy">Services</Link>
            <Link href="#products" className="transition hover:text-pillio-navy">Products</Link>
            <Link href="#contact" className="transition hover:text-pillio-navy">Contact</Link>
          </nav>
          <Link href="#contact" className="cta-button px-4 py-2.5 text-xs sm:text-sm">
            Contact Us
          </Link>
        </div>
      </header>

      <main>
        <section id="home" className="site-shell grid gap-14 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <motion.div initial="hidden" animate="show" variants={fadeIn} transition={{ duration: 0.6 }}>
            <span className="section-eyebrow">Transforming Business Through Innovation</span>
            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight md:text-6xl">
              Product Development, AI Automations &amp; Digital Marketing.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
              Pillio Technology Solutions helps organizations modernize faster with enterprise-grade product engineering,
              cloud expertise, and strategic consulting that delivers real outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#contact" className="cta-button">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="#services" className="ghost-button">Our Services</Link>
            </div>

            {/* Animated service pills */}
            <motion.div
              className="mt-7 flex flex-wrap gap-2"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.18, delayChildren: 0.8 } } }}
            >
              {heroPills.map((pill) => (
                <motion.span
                  key={pill.label}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="animate-float inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-pillio-navy shadow-sm"
                >
                  <span>{pill.emoji}</span> {pill.label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="surface-card p-7 md:p-8"
          >
            <h2 className="text-2xl font-bold text-pillio-navy">At A Glance</h2>
            <div className="mt-7 grid grid-cols-2 gap-4">
              {statItems.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="font-display text-2xl font-bold text-pillio-navy">
                    <CountUp target={item.numeric} suffix={item.suffix} />
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-7 text-sm leading-relaxed text-[var(--text-muted)]">
              Our teams combine product thinking, architecture leadership, and execution discipline to build
              resilient digital systems for modern businesses.
            </p>
          </motion.div>
        </section>

        {/* Scrolling trust marquee */}
        <div className="overflow-hidden border-y border-slate-200/80 bg-white/70 py-3.5 backdrop-blur-sm">
          <div className="animate-marquee inline-flex gap-0">
            {[...trustItems, ...trustItems].map((item, i) => (
              <span key={i} className="mx-8 whitespace-nowrap text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                {item}
              </span>
            ))}
          </div>
        </div>

        <section id="about" className="site-shell pb-16 md:pb-20">
          <div className="surface-card grid gap-10 p-8 md:grid-cols-2 md:p-12">
            <div>
              <span className="section-eyebrow">About Us</span>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">Driving Digital Transformation</h2>
            </div>
            <div className="space-y-4 text-[15px] leading-relaxed text-[var(--text-muted)]">
              <p>
                Pillio Technology Solutions is a product and consulting partner focused on helping businesses navigate complex
                digital change with confidence.
              </p>
              <p>
                Our consultants and engineers blend industry expertise with modern delivery methods to build
                tailored technology solutions that improve operations and unlock growth.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="site-shell pb-16 md:pb-20">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
          >
            <span className="section-eyebrow">Our Services</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Comprehensive IT Solutions</h2>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                className="surface-card p-6"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(10,17,40,0.13)' }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <div className="mb-5 inline-flex rounded-xl bg-sky-100 p-3 text-pillio-navy">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-pillio-navy">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{service.desc}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="products" className="site-shell pb-16 md:pb-20">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
          >
            <span className="section-eyebrow">Our Products</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Innovation That Delivers Value</h2>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-2">
            {products.map((product, index) => (
              <motion.article
                key={product.title}
                className={`surface-card p-6 ${product.placeholder ? 'border-dashed opacity-70' : ''}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={!product.placeholder ? { y: -5, boxShadow: '0 20px 40px rgba(10,17,40,0.13)' } : {}}
                transition={{ duration: 0.35, delay: index * 0.08 }}
              >
                <span className="mb-3 inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-sky-600 border border-sky-200">
                  {product.tag}
                </span>
                <h3 className={`text-xl font-semibold ${product.placeholder ? 'text-slate-400' : 'text-pillio-navy'}`}>
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{product.desc}</p>
                {!product.placeholder && (
                  <Link href="#contact" className="mt-6 inline-flex items-center text-sm font-semibold text-pillio-navy">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </motion.article>
            ))}
          </div>
        </section>

        <section className="site-shell pb-16 md:pb-20">
          <div className="surface-card p-8 md:p-12">
            <span className="section-eyebrow">Testimonials</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">What Our Clients Say</h2>
            <blockquote className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
              "Pillio transformed our digital infrastructure completely. Their technical depth and delivery
              discipline exceeded expectations, and we observed a significant improvement in operational
              efficiency."
            </blockquote>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.13em] text-slate-500">
              John Davidson, CTO, Global Finance Corp
            </p>
          </div>
        </section>

        <section id="contact" className="site-shell pb-24">
          <div className="surface-card grid gap-10 p-8 md:grid-cols-2 md:p-12">
            {/* Left: info */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="section-eyebrow">Contact Us</span>
                <h2 className="mt-4 text-3xl font-bold md:text-4xl">Let&apos;s Start A Conversation</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
                  Tell us about your goals and we will design a technology roadmap that moves your business
                  forward with confidence.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="mb-2 flex items-center gap-2 font-semibold text-pillio-navy">
                    <MapPin className="h-4 w-4" /> Address
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">123 Tech Innovation Drive, San Francisco, CA 94105</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="mb-2 flex items-center gap-2 font-semibold text-pillio-navy">
                    <Mail className="h-4 w-4" /> Email
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">info@pillio.com</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="mb-2 flex items-center gap-2 font-semibold text-pillio-navy">
                    <Phone className="h-4 w-4" /> Phone
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <form
              onSubmit={handleSubmit(onContactSubmit)}
              className="flex flex-col gap-4"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('name')}
                    placeholder="Jane Smith"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-pillio-navy focus:ring-2 focus:ring-pillio-navy/10"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-pillio-navy focus:ring-2 focus:ring-pillio-navy/10"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Phone
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-pillio-navy focus:ring-2 focus:ring-pillio-navy/10"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Service <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register('service')}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-pillio-navy focus:ring-2 focus:ring-pillio-navy/10"
                  >
                    <option value="">Select a service…</option>
                    {services.map((s) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                  {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service.message}</p>}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="Tell us about your project or challenge…"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-pillio-navy focus:ring-2 focus:ring-pillio-navy/10"
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="cta-button mt-2 w-full justify-center disabled:opacity-60"
              >
                {submitStatus === 'loading' ? 'Sending…' : 'Send Message'}
                {submitStatus !== 'loading' && <ArrowRight className="ml-2 h-4 w-4" />}
              </button>

              {submitStatus === 'success' && (
                <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700 border border-green-200">
                  ✅ Message sent! We&apos;ll be in touch shortly.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 border border-red-200">
                  ❌ Something went wrong. Please try again or email us directly.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/80 py-8">
        <div className="site-shell flex flex-col gap-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <PillioLogo href="/" size="sm" />
            <p className="pl-0.5 text-xs font-medium tracking-wide text-pillio-navy/60">
              Engineer What&apos;s Next.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="flex items-center gap-5">
              <Link href="#services" className="hover:text-pillio-navy">Services</Link>
              <Link href="#products" className="hover:text-pillio-navy">Products</Link>
              <Link href="#contact" className="hover:text-pillio-navy">Contact</Link>
            </div>
            <p className="text-xs text-slate-400">© 2026 Pillio Technology Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
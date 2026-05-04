import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from './useScrollAnimation'
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const TO_EMAIL = 'venkatakarthiksai.s@gmail.com'

async function sendEmail(data: FormData) {
  const html = `
    <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;border-radius:16px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#1E3A8A,#2548A8);padding:32px 24px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:24px">New Contact Form Submission</h1>
        <p style="color:rgba(255,255,255,.7);margin:8px 0 0;font-size:14px">DM Enterprises Website</p>
      </div>
      <div style="padding:32px 24px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:120px">Name</td><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1f2937">${data.name}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Email</td><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1f2937"><a href="mailto:${data.email}" style="color:#1E3A8A">${data.email}</a></td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Phone</td><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1f2937">${data.phone || 'Not provided'}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Company</td><td style="padding:12px 0;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1f2937">${data.company || 'Not provided'}</td></tr>
        </table>
        <div style="margin-top:24px;padding:20px;background:#fff;border-radius:12px;border:1px solid #e5e7eb">
          <p style="color:#6b7280;font-size:13px;margin:0 0 8px">Message</p>
          <p style="color:#1f2937;margin:0;line-height:1.6;white-space:pre-wrap">${data.message}</p>
        </div>
      </div>
    </div>
  `

  const res = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'DM Enterprises <onboarding@resend.dev>',
      to: [TO_EMAIL],
      subject: `New Inquiry from ${data.name}`,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err?.message || 'Failed to send email')
  }
  return res.json()
}

const contactInfo = [
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'IDA, Near BEL Circle,\nVenkataramana Colony, Mallapur,\nSecunderabad, Telangana 500076',
    color: 'bg-red-500/10 text-red-500',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    color: 'bg-green-500/10 text-green-500',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'contact@dmenterprises.in',
    href: 'mailto:contact@dmenterprises.in',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon – Sat: 9:00 AM – 6:00 PM',
    color: 'bg-amber-500/10 text-amber-500',
  },
]

export default function ContactSection() {
  const [ref, isInView] = useScrollAnimation(0.05)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await sendEmail(formData)
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-dark tracking-tight">
            Let&apos;s Build Your Workspace
          </h2>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            Have a project in mind? Reach out and we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-grey rounded-3xl p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-text-dark mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 min-h-[48px] bg-white border border-gray-200 rounded-xl text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-text-dark mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                    className="w-full px-4 py-3.5 min-h-[48px] bg-white border border-gray-200 rounded-xl text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-semibold text-text-dark mb-2">
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3.5 min-h-[48px] bg-white border border-gray-200 rounded-xl text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="contact-company" className="block text-sm font-semibold text-text-dark mb-2">
                    Company
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full px-4 py-3.5 min-h-[48px] bg-white border border-gray-200 rounded-xl text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="block text-sm font-semibold text-text-dark mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your project requirements..."
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
                />
              </div>

              <div className="mt-6 flex items-center gap-4 flex-wrap">
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-8 py-4 min-h-[52px] bg-primary text-white font-semibold rounded-2xl shadow-[0_4px_15px_rgba(30,58,138,0.3)] hover:shadow-[0_8px_30px_rgba(30,58,138,0.4)] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {status === 'success' && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Message sent successfully!
                  </motion.span>
                )}
                {status === 'error' && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Failed to send. Please try again.
                  </motion.span>
                )}
              </div>
            </form>
          </motion.div>

          {/* Right: Map + Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Google Maps */}
            <div className="rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] h-56 sm:h-64 lg:h-72">
              <iframe
                title="DM Enterprises Location"
                src="https://maps.google.com/maps?q=IDA,%20Near%20BEL%20Circle,%20Venkataramana%20Colony,%20Mallapur,%20Secunderabad,%20Telangana%20500076&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-2 gap-3">
              {contactInfo.map((item, i) => {
                const Icon = item.icon
                const inner = (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    className="bg-grey rounded-2xl p-4 hover:bg-primary/5 transition-colors duration-300"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-text-dark whitespace-pre-line leading-relaxed">
                      {item.value}
                    </p>
                  </motion.div>
                )

                return item.href ? (
                  <a key={item.label} href={item.href} className="block hover:no-underline">
                    {inner}
                  </a>
                ) : (
                  <div key={item.label}>{inner}</div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

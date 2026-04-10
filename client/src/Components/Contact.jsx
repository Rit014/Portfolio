import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import styles from './Contact.module.css'

const initialForm = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm]       = useState(initialForm)
  const [status, setStatus]   = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

 const handleSubmit = async (e) => {
  e.preventDefault()
  setStatus('loading')
  try {
    const BASE_URL = import.meta.env.VITE_API_URL || ''
    await axios.post(`${BASE_URL}/api/contact`, form)
    setStatus('success')
    setForm(initialForm)
  } catch {
    setStatus('error')
  }
}

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.label}>Contact</div>

      <motion.form
        className={styles.form}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.row}>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          className={styles.input}
          name="message"
          rows={4}
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={handleChange}
          required
          style={{ resize: 'none' }}
        />

        <button
          type="submit"
          className={styles.btnSubmit}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending…' : 'Send message ↗'}
        </button>

        {status === 'success' && (
          <p className={styles.successMsg}>
            Message sent! I'll get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className={styles.errorMsg}>
            Something went wrong. Please try again or email me directly.
          </p>
        )}
      </motion.form>
    </section>
  )
}
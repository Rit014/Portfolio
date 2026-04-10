import { motion } from 'framer-motion'
import { personalInfo, stats } from '../data'
import styles from './Hero.module.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

export default function Hero() {
  return (
    <section id="about" className={styles.hero}>
      <motion.div className={styles.tag} {...fadeUp(0.1)}>
        {personalInfo.tagline}
      </motion.div>

      <motion.h1 className={styles.name} {...fadeUp(0.2)}>
        Hi, I'm <span>{personalInfo.name}.</span>
        <br />
        {personalInfo.role}
      </motion.h1>

      <motion.p className={styles.bio} {...fadeUp(0.3)}>
        {personalInfo.bio}
      </motion.p>

      <motion.div className={styles.statsRow} {...fadeUp(0.4)}>
        {stats.map((s) => (
          <div key={s.label} className={styles.stat}>
            <span className={styles.statNum}>{s.number}</span>
            <span className={styles.statLbl}>{s.label}</span>
          </div>
        ))}
      </motion.div>

      <motion.div className={styles.btns} {...fadeUp(0.5)}>
        <a href="#projects" className={styles.btnPrimary}>
          View Projects
        </a>
        <a href={personalInfo.resume} download className={styles.btnOutline}>
          Download CV
        </a>
      </motion.div>
    </section>
  )
}
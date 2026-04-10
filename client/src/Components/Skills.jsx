import { motion } from 'framer-motion'
import { skills } from '../data'
import styles from './Skills.module.css'

const categoryClass = {
  m: styles.tagM,
  e: styles.tagE,
  r: styles.tagR,
  n: styles.tagN,
  x: styles.tagX,
}

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.label}>Tech Stack</div>
      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {skills.map((skill) => (
          <motion.span
            key={skill.name}
            className={`${styles.tag} ${categoryClass[skill.category]}`}
            variants={{
              hidden: { opacity: 0, scale: 0.85 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            {skill.name}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
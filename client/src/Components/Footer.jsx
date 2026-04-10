import { personalInfo } from '../data'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>
        © {new Date().getFullYear()} {personalInfo.fullName}
      </span>
      <div className={styles.links}>
        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={`mailto:${personalInfo.email}`}>Email</a>
      </div>
    </footer>
  )
}
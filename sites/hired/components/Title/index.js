import { motion } from 'framer-motion';
import styles from './title.module.css';

export default function Title() {
  return (
    <motion.h1
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={styles.title}
      layoutId="title">
      Hired!
    </motion.h1>
  );
}

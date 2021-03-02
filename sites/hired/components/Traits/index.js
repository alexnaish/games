import { motion } from 'framer-motion';
import styles from './traits.module.css';

const variants = {
  hidden: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5
    }
  }
};

const item = {
  hidden: { opacity: 0 },
  open: { opacity: 1 }
};

export default function Traits({ traits }) {
  return (
    <motion.ul animate="open" initial="hidden" variants={variants} className={styles.list}>
      {traits.map((trait) => (
        <motion.li className={styles.trait} key={trait} variants={item}>
          {trait}
        </motion.li>
      ))}
    </motion.ul>
  );
}

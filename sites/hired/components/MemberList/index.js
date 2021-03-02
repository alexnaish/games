import { AnimatePresence, motion } from 'framer-motion';
import styles from './member-list.module.css';

export default function MemberList({ members }) {
  return (
    <AnimatePresence>
      <div className={styles.list}>
        {Object.entries(members).map(([id, member]) => {
          return (
            <motion.div
              key={id}
              initial={{ flexGrow: 0.000001 }}
              animate={{ flexGrow: 1 }}
              exit={{ flexGrow: 0.000001 }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
              className={styles.item}>
              {member.name}
            </motion.div>
          );
        })}
      </div>
    </AnimatePresence>
  );
}

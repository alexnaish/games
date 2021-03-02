import Link from 'next/link';
import styles from './error.module.css';

export default ({ message }) => {
  return (
    <div>
      <div className={styles.title}>Error</div>
      <div className={styles.message}>{message}</div>
      <Link href="/">Return Home</Link>
    </div>
  );
};

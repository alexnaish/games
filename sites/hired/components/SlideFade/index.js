import { motion } from 'framer-motion';

const hiddenStyle = { opacity: 0, translateX: -100 };
const variants = {
  load(index) {
    return {
      opacity: 1,
      x: 100,
      transition: { delay: index * 0.3, duration: 0.4 }
    };
  }
};

export default ({ children, order }) => {
  return (
    <motion.div variants={variants} custom={order} animate="load" style={hiddenStyle}>
      {children}
    </motion.div>
  );
};

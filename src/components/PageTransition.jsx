import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
export default function PageTransition({ children }) {
  const location = useLocation();
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname + location.hash}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduce ? {} : { opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.12, ease: "easeOut" }}
        className="min-h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

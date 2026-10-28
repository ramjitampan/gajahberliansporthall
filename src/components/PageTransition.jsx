import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={reduce ? false : { opacity: 0.9, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? {} : { opacity: 0.9 }}
        transition={{ duration: reduce ? 0 : 0.14, ease: "easeOut" }}
        className="min-h-full w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

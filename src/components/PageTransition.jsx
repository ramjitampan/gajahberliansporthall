import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
  const location = useLocation();
  const reduce = useReducedMotion();
  const isFullBleedPage = location.pathname === "/tentang" || location.pathname === "/fasilitas" || location.pathname === "/lokasi" || location.pathname === "/booking/riwayat";

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={reduce ? false : { opacity: 0.9, y: isFullBleedPage ? 0 : 6 }}
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

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
export default function PageTransition({children}){const location=useLocation();const reduce=useReducedMotion();return <AnimatePresence mode="wait" initial={false}><motion.div key={location.pathname+location.hash} initial={reduce?false:{opacity:0,y:7}} animate={{opacity:1,y:0}} exit={reduce?{}:{opacity:0,y:-4}} transition={{duration:reduce?0:.22,ease:'easeOut'}} className="min-h-full">{children}</motion.div></AnimatePresence>}

import { motion } from "framer-motion";

export default function LoaderScreen() {
  return (
    <motion.div
      exit={{ opacity: 0, y: -100, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="fixed z-[100] h-full w-full grid place-items-center bg-dark"
    >
      <div className="border-t-transparent animate-spin rounded-full border-aqua border-4 h-16 w-16" />
    </motion.div>
  );
}

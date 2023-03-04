import { motion } from "framer-motion";
import { useEffect } from "react";

import { ModalContent } from "./ModalContent";

export default function AddMovieModal({ setOpen }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const closeModal = () => setOpen(false);
  return (
    <>
      {/* desktop */}
      <motion.div
        variants={{
          close: { opacity: 0 },
          open: { opacity: 1 },
        }}
        initial="close"
        animate="open"
        exit="close"
        className="hidden fixed sm:grid place-items-center z-[101] w-full h-screen bg-mask/60 backdrop-blur-sm"
      >
        <motion.div
          variants={{
            close: { y: 200 },
            open: { y: 0 },
          }}
          initial="close"
          whileInView="open"
          exit="close"
          transition={{ type: "spring", duration: 0.8, bounce: false }}
          className="h-[400px] w-modal bg-dark px-4 py-4 overflow-hidden"
        >
          <ModalContent closeModal={closeModal} />
        </motion.div>
      </motion.div>
      {/* mobile */}
      <motion.div
        variants={{
          close: { x: "-100%" },
          open: { x: 0 },
        }}
        initial="close"
        animate="open"
        exit="close"
        transition={{ type: "spring", bounce: false, duration: 0.7 }}
        className="fixed top-0 sm:hidden bg-dark h-screen w-full pt-28 pb-12 z-[70]"
      >
        <motion.div className="h-full w-[90%] mx-auto overflow-hidden">
          <ModalContent closeModal={closeModal} />
        </motion.div>
      </motion.div>
    </>
  );
}

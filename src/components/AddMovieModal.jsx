import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useStore } from "../store";
import { ModalContent } from "./ModalContent";

export default function AddMovieModal({ setOpen, isDesktop }) {
  const changeModalState = useStore((state) => state.changeModalState);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    changeModalState(true);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const closeModal = () => {
    changeModalState(false);
    setOpen(false);
  };
  if (isDesktop) {
    return (
      <motion.div
        variants={{
          close: { opacity: 0 },
          open: { opacity: 1 },
        }}
        initial="close"
        animate="open"
        exit="close"
        className="grid top-0 fixed place-items-center z-[103] w-full h-screen bg-mask/60 backdrop-blur-sm"
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
    );
  } else {
    return (
      <motion.div
        variants={{
          close: { x: "-100%" },
          open: { x: 0 },
        }}
        initial="close"
        animate="open"
        exit="close"
        transition={{ type: "spring", bounce: false, duration: 0.7 }}
        className="fixed top-0 bg-dark h-screen w-full pt-28 pb-12 z-[101]"
      >
        <motion.div className="w-[90%] mx-auto overflow-hidden h-full">
          <ModalContent closeModal={closeModal} />
        </motion.div>
      </motion.div>
    );
  }
}

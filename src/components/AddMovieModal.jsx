import { ButtonBase } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { HiOutlinePaperClip } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

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
        className="hidden fixed sm:grid place-items-center z-[100] w-full h-screen bg-mask/60 backdrop-blur-sm"
      >
        <div className="h-[400px] w-modal bg-dark px-4 py-4">
          <ModalContent closeModal={closeModal} />
        </div>
      </motion.div>
      {/* mobile */}
      <motion.div
        variants={{
          close: { x: "-100%", opacity: 0.8 },
          open: { x: 0, opacity: 1 },
        }}
        initial="close"
        animate="open"
        exit="close"
        transition={{ type: "spring", bounce: false, duration: 0.7 }}
        className="fixed top-0 sm:hidden bg-dark h-screen w-full pt-28 pb-12 z-[40]"
      >
        <div className="h-full w-[90%] mx-auto">
          <ModalContent closeModal={closeModal} />
        </div>
      </motion.div>
    </>
  );
}

function ModalContent({ closeModal }) {
  return (
    <div className="flex h-full flex-col items-center relative justify-between pb-16 sm:pb-6">
      <span className="absolute text-2xl -right-2 -top-2 hidden sm:block rounded-full overflow-hidden">
        <ButtonBase onClick={closeModal}>
          <IoMdClose className="m-2" />
        </ButtonBase>
      </span>
      <h2 className="text-aqua uppercase text-lg mt-6">agregar película</h2>
      <label
        htmlFor="movie_img"
        className="h-16 border-2 border-dashed border-zinc-400 w-full sm:w-[92%] text-sm font-thin uppercase flex items-center justify-center cursor-pointer gap-x-2"
      >
        <HiOutlinePaperClip className="rotate-90 text-xl" />
        <span className="block md:hidden">Agregá un archivo</span>
        <span className="hidden md:block">
          Agregá un archivo o arrastralo y soltalo aquí
        </span>
        <input type="file" id="movie_img" className="hidden" />
      </label>
      <input
        type="text"
        className="w-[90%] max-w-[18rem] p-2 bg-transparent border-b-2 border-zinc-300 font-thin uppercase text-center outline-none focus:bg-zinc-400/10 transition-colors duration-300 ease-out"
        placeholder="título"
      />
      <div className="flex w-[90%] max-w-[18rem] flex-col gap-y-2">
        <button className="flex justify-center items-center h-12 bg-zinc-400 text-dark uppercase font-thin w-full border border-zinc-400 mx-auto">
          subir película
        </button>
        <button
          onClick={closeModal}
          className="flex sm:hidden justify-center items-center h-12 bg-dark/40 uppercase font-thin w-full border border-white/40 mx-auto"
        >
          Salir
        </button>
      </div>
    </div>
  );
}

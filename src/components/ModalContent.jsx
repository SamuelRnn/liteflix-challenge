import { ButtonBase } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { motion, useMotionValueEvent, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { HiOutlinePaperClip } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useStore } from "../store";
import { postNewMovieImage, isImage, simulateDelay } from "../services";

export function ModalContent({ closeModal }) {
  //store hook
  const addMovie = useStore((state) => state.addMovie);

  // image charging simulation states
  const [loader, setLoader] = useState(false);
  const [interactionRendered, setInteractionState] = useState(null);
  const [textRendered, setTextRendering] = useState(false);
  const scaleX_transition = useMotionValue(0);

  useMotionValueEvent(scaleX_transition, "animationStart", () => {
    setTextRendering(false);
  });
  useMotionValueEvent(scaleX_transition, "animationComplete", () => {
    setTextRendering(true);
  });
  // form states
  const [newMovie, setNewMovie] = useState({
    image: null,
    title: "",
  });
  // movie submitting states
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSucess, setSucess] = useState(false);

  const onImageChange = async ({ target: { files } }) => {
    if (!files.length) return;
    setLoader(true);
    if (isImage(files[0])) {
      setNewMovie({ ...newMovie, image: files[0] });
      setInteractionState("listo!");
    } else {
      await simulateDelay(1.5);
      setInteractionState("ingrese una imagen!");

      await simulateDelay(6);
      setInteractionState(null);
      setLoader(false);
    }
  };

  const onTitleChange = ({ target }) => {
    setNewMovie({ ...newMovie, title: target.value });
  };
  const onMovieSubmit = async () => {
    setSubmitting(true);
    const movie = { ...newMovie };
    const [id, image] = await postNewMovieImage(newMovie.image);
    movie.image = image;
    movie.id = id;
    addMovie(movie);
    //trigger animations
    await simulateDelay(2);
    setSucess(true);
    await simulateDelay(0.5);
    setSubmitting(false);
  };

  useEffect(() => {}, [loader]);
  return (
    <div className="flex h-full flex-col items-center relative justify-between pb-16 sm:pb-6">
      {/* close button desktop */}
      <span className="absolute text-2xl -right-2 -top-2 hidden sm:block rounded-full overflow-hidden text-zinc-300 z-40">
        <ButtonBase onClick={closeModal}>
          <IoMdClose className="m-2" />
        </ButtonBase>
      </span>
      {/* content */}
      <h2 className="text-aqua uppercase text-lg mt-6">agregar película</h2>
      <div
        id="loader and uploader"
        className="h-24  w-full sm:w-[92%] text-sm uppercase overflow-hidden relative"
      >
        <motion.label
          // id="motion_label"
          animate={{ opacity: loader ? 0 : 1 }}
          // htmlFor="movie_img"
          className="absolute h-full w-full flex items-center justify-center cursor-pointer gap-x-2 border-2 border-dashed border-zinc-400"
        >
          <input
            name="movie_img"
            accept="image/*"
            type="file"
            // id="movie_img"
            className="hidden"
            onChange={onImageChange}
          />
          <HiOutlinePaperClip className="rotate-90 text-xl" />
          <span className="block md:hidden">Agregá un archivo</span>
          <span className="hidden md:block">
            Agregá un archivo o arrastralo y soltalo aquí
          </span>
        </motion.label>
        <AnimatePresence>
          {loader && (
            <motion.div
              key="image_loader"
              className="h-24 w-full flex flex-col justify-center gap-4 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="h-3 w-full bg-zinc-200/40">
                <motion.div
                  className={`h-3 w-full ${
                    interactionRendered === "listo!" || !interactionRendered
                      ? "bg-aqua"
                      : "bg-red-400"
                  } transition-colors duration-500 ease-out origin-left`}
                  style={{ scaleX: scaleX_transition }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: "100%", transition: { duration: 3 } }}
                />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: textRendered ? 1 : 0 }}
                className="w-fit absolute bottom-0 right-0"
              >
                <h2
                  className={`py-2 ${
                    interactionRendered === "ingrese una imagen!"
                      ? "text-red-400"
                      : "text-aqua"
                  }`}
                >
                  {interactionRendered}
                </h2>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <input
        type="text"
        onChange={onTitleChange}
        value={newMovie.title}
        className="w-[90%] max-w-[18rem] p-2 bg-transparent border-b-2 border-zinc-300 uppercase text-center outline-none focus:bg-zinc-500/10 focus:border-aqua transition-colors duration-300 ease-out"
        placeholder="título"
      />
      <div className="flex w-[90%] max-w-[18rem] flex-col gap-y-2">
        <button
          onClick={onMovieSubmit}
          disabled={!newMovie.image || !newMovie.title || !textRendered}
          className="flex justify-center items-center h-12 disabled:bg-zinc-500 disabled:text-zinc-600 bg-zinc-300 text-dark uppercase w-full border border-zinc-500 mx-auto transition-colors ease-out duration-500"
        >
          subir película
        </button>
        <button
          onClick={closeModal}
          className="flex sm:hidden justify-center items-center h-12 bg-dark/40 uppercase w-full border border-white/40 mx-auto"
        >
          Salir
        </button>
      </div>
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            key="movie_create_spinner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.5, type: "spring", bounce: false }}
            className="absolute w-full h-full top-0 bg-dark grid place-items-center  z-50"
          >
            <div className="border-t-transparent animate-spin rounded-full border-aqua border-4 h-12 w-12" />
          </motion.div>
        )}
      </AnimatePresence>
      {isSucess && (
        <motion.div className="absolute w-full h-full top-0 bg-dark grid place-items-center z-30 text-center uppercase">
          <div className="flex flex-col gap-5">
            <h2 className="uppercase text-aqua text-2xl mb-8">
              <span className="font-bold">lite</span>
              <span>flix</span>
            </h2>
            <h3>felicitaciones</h3>
            <p className="font-thin text-zinc-300 max-sm:max-w-[240px]">
              <span className="font-normal text-zinc-100">
                {newMovie.title}
              </span>{" "}
              fue correctamente subida
            </p>
            <button
              onClick={closeModal}
              className="mt-12 flex justify-center items-center h-12 bg-dark/40 uppercase w-full max-sm:max-w-[240px] border border-white/40 mx-auto"
            >
              ir al home
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

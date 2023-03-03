import { config } from "../config";
import { BiChevronDown } from "react-icons/bi";
import { BsPlay } from "react-icons/bs";
import ButtonBase from "@mui/material/ButtonBase";
import { useState } from "react";
import Menu from "./Menu";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function MoviesShowcase({ movies, onLoad, loading, className }) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((open) => !open);
  };
  const getSelected = () => {
    const views = ["populares", "mis películas"];
    return views[selected];
  };
  return (
    <div className={className}>
      {/* select and menu container */}
      <div className="relative">
        <ButtonBase onClick={() => setOpen(true)}>
          <div className="uppercase font-thin px-2 py-1 w-fit flex items-center gap-x-1">
            <span className="text-zinc-300">ver: </span>
            <span className="text-white">{getSelected()}</span>
            <BiChevronDown
              className={`text-2xl ${
                open && "rotate-180"
              } transition-transform`}
            />
          </div>
        </ButtonBase>
        {/* menu */}
        <AnimatePresence>
          {open && (
            <Menu
              selected={selected}
              setSelected={setSelected}
              open={open}
              toggleModal={toggleModal}
            />
          )}
        </AnimatePresence>
      </div>
      {/* movies */}
      {movies.map((movie, i) => (
        <motion.div
          key={movie.id}
          variants={{
            loaded: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut",
              },
            },
            loading: {
              opacity: 0,
              y: 40,
            },
          }}
          initial="loading"
          whileInView={loading ? "loading" : "loaded"}
          viewport={{ once: true }}
          className="movie-miniature"
        >
          <div className="relative">
            <img
              src={config.IMAGES_BASEPATH_w500 + movie.backdrop_path}
              alt={movie.original_title}
              className="object-cover"
              onLoad={onLoad}
            />
            <div className="absolute w-full h-full grid place-items-center bg-mask/40 top-0">
              <div className="text-center">
                <span className="mx-auto w-fit p-1 rounded-full border border-white/90 bg-mask/40 grid place-items-center play-icon transition-colors ease-out duration-500">
                  <BsPlay className="text-2xl" />
                </span>
                <p className="mt-2 text-sm uppercase font-thin px-2 overflow-hidden whitespace-nowrap text-ellipsis max-w-[192px]">
                  {movie.original_title}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

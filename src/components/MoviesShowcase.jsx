import { config } from "../config";
import { BiChevronDown } from "react-icons/bi";
import { BsPlayFill, BsStarFill } from "react-icons/bs";
import { MdMovieFilter } from "react-icons/md";
import ButtonBase from "@mui/material/ButtonBase";
import { useState } from "react";
import Menu from "./Menu";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useStore } from "../store";

export default function MoviesShowcase({
  movies,
  onLoad,
  loading,
  className,
  delay = false,
}) {
  const myMovies = useStore((state) => state.myMovies);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((open) => !open);
  };
  const [isHovered, setHovered] = useState(null);

  const getSelectedHeading = () => {
    const views = ["populares", "mis películas"];
    return views[selected];
  };
  const getSelectedDisplayElements = () => {
    if (selected === 0) return movies;
    if (selected === 1) return myMovies;
  };
  return (
    <div className={className}>
      {/* select and menu container */}
      <div className="mx-auto w-[12rem] sm:w-full flex justify-center md:sticky top-0 z-20 mb-4 bg-white/[0.02 backdrop-blur-sm z-[100]">
        <ButtonBase onClick={() => setOpen(true)}>
          <div className="uppercase font-thin px-2 py-1 w-fit flex items-center gap-x-1">
            <span className="text-zinc-300 pl-2">ver: </span>
            <span className="text-white">{getSelectedHeading()}</span>
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
      <div className="flex flex-col gap-y-3 h-full">
        {getSelectedDisplayElements().map((movie, index) => (
          <div className="overflow-hidden shadow-md rounded-sm" key={movie.id}>
            <motion.div
              variants={{
                loaded: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    bounce: false,
                    delay: delay && (index + 1) * 0.2,
                    duration: 1.4,
                  },
                },
                loading: {
                  opacity: 0,
                  y: 30,
                },
              }}
              initial="loading"
              whileInView={loading ? "loading" : "loaded"}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-ful">
                <img
                  src={
                    movie.backdrop_path
                      ? config.IMAGES_BASEPATH_w500 + movie.backdrop_path
                      : movie.image
                  }
                  alt={movie.original_title || movie.title}
                  className="object-cover aspect-video"
                  onLoad={onLoad}
                />
                {/* main view  */}
                <AnimatePresence>
                  {isHovered !== movie.id && (
                    <motion.div
                      id={movie.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="absolute w-full h-full flex flex-col justify-center bg-mask/50 top-0 z-40">
                        <motion.span className="mx-auto w-fit p-2 rounded-full border border-white/90 bg-mask/50 grid place-items-center play-icon transition-colors ease-out duration-500">
                          <BsPlayFill className="text-2xl" />
                        </motion.span>
                      </div>
                      <p className="z-40 absolute bottom-1 overflow-hidden w-full text-center whitespace-nowrap text-ellipsis text-zinc-200 font-thin uppercase md:text-sm px-4">
                        {movie.original_title || movie.title}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* hover target */}
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isHovered === movie.id ? 1 : 0 }}
                  onHoverStart={() => setHovered(movie.id)}
                  onHoverEnd={() => setHovered(null)}
                  className="absolute top-0 w-full h-full z-[60] bg-mask/60"
                >
                  <div className="absolute w-full h-full bg-mask/50 z-40">
                    <div className="h-full flex flex-col w-full justify-end uppercase font-thin md:text-sm">
                      {/* play button and title */}
                      <div className="px-4 max-md:py-3 grid grid-hover items-center content-start">
                        <motion.span
                          variants={{
                            hovered: {
                              scale: 1,
                              transition: { type: "spring", bounce: false },
                            },
                            normal: { scale: 1.5 },
                          }}
                          initial="normal"
                          animate={
                            isHovered === movie.id ? "hovered" : "normal"
                          }
                          whileHover={{
                            backgroundColor: "rgba(100 238 188)",
                            color: "rgb(12 12 12)",
                            borderColor: "rgba(100 238 188)",
                            // fill: "rgb(12 12 12)",
                          }}
                          className="w-fit h-fit p-1 rounded-full border border-white/90 bg-mask/50 grid"
                        >
                          <BsPlayFill className="text-2xl hover:fill-dark" />
                        </motion.span>
                        <h4 className="w-full whitespace-nowrap overflow-hidden pl-2 text-ellipsis">
                          {movie.original_title || movie.title}
                        </h4>
                      </div>
                      {/* date and rate */}
                      <div className="flex items-center justify-between px-6 py-2">
                        <p className="flex items-center gap-1">
                          <BsStarFill className="text-aqua" />
                          <span>{movie.vote_average || "-"}</span>
                        </p>
                        <p>{movie.release_date?.slice(0, 4) || "-"}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ))}
        {/* no movies placeholder */}
        {selected === 1 && !myMovies.length && (
          <div className="text-center font-thin uppercase text-zinc-200 mt-8 mx-auto max-w-[200px] p-4 bg-zinc-200/10 rounded-sm">
            <center>
              <MdMovieFilter className="text-3xl" />
            </center>
            <h3 className="mt-2 select-none">
              aún no cargaste ninguna película
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

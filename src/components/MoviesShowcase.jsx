import { config } from "../config";
import { BiChevronDown } from "react-icons/bi";
import ButtonBase from "@mui/material/ButtonBase";
import { useState } from "react";
import Menu from "./Menu";
import { AnimatePresence } from "framer-motion";

export default function MoviesShowcase({ movies }) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((open) => !open);
  };
  return (
    <div className="flex flex-col max-w-[12rem] ml-auto gap-y-4 items-center">
      {/* select and menu container */}
      <div className="relative">
        <ButtonBase onClick={toggleModal}>
          <div className="uppercase font-thin px-2 py-1 w-fit flex items-center gap-x-1">
            <span className="text-zinc-300">ver: </span>
            <span className="text-white">populares</span>
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
        {/* movies */}
      </div>
      {movies.map((movie) => (
        <div className="bg-zinc-700 overflow-hidden" key={movie.id}>
          <img
            src={config.IMAGES_BASEPATH_w500 + movie.backdrop_path}
            alt={movie.original_title}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

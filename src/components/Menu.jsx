import { useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import ButtonBase from "@mui/material/ButtonBase";
import { motion } from "framer-motion";

export default function Menu({ selected, setSelected, toggleModal }) {
  useEffect(() => {
    const root = document.getElementById("root");
    root.addEventListener("click", toggleModal);
    return () => {
      root.removeEventListener("click", toggleModal);
    };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="-bottom-[5.2rem] -right-3 bg-dark absolute w-52 py-2 flex shadow-xl rounded-sm"
    >
      <div className="flex flex-col text-left w-full font-thin text-zinc-300">
        <ButtonBase onClick={() => setSelected(0)}>
          <button
            className={`px-4 w-full py-1 uppercase flex justify-between items-center ${
              selected === 0 && "font-normal text-white"
            }`}
          >
            <span>populares</span>
            {selected === 0 && <FiCheck />}
          </button>
        </ButtonBase>
        <ButtonBase onClick={() => setSelected(1)}>
          <button
            className={`px-4 w-full py-1 uppercase flex justify-between items-center ${
              selected === 1 && "font-normal text-white"
            }`}
          >
            <span>mis peliculas</span>
            {selected === 1 && <FiCheck />}
          </button>
        </ButtonBase>
      </div>
    </motion.div>
  );
}

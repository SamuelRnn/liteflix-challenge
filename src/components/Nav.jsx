import picture from "../assets/profile.jpg";
import { GoPlusSmall } from "react-icons/go";
import { BiBell, BiMenuAltRight } from "react-icons/bi";
import ButtonBase from "@mui/material/ButtonBase";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";

export default function Nav({ setOpen, isOpen }) {
  const [isTop, setTop] = useState(true);

  useEffect(() => {
    window.onscroll = () => {
      if (scrollY === 0) {
        setTop(true);
      } else {
        setTop(false);
      }
    };
  }, []);
  const openModal = () => setOpen(true);
  return (
    <motion.nav
      className="flex"
      variants={{
        top: { backgroundColor: "#00000000" },
        scrolled: { backgroundColor: "#242424" },
      }}
      initial="top"
      animate={isTop ? "top" : "scrolled"}
      transition={{ duration: 0.4 }}
    >
      <div className="w-main mx-auto flex justify-between h-20">
        <div
          className={`md:hidden flex items-center ${
            isOpen && "opacity-0"
          } transition-opacity duration-300`}
        >
          <div
            className="rounded-full border border-zinc-300 overflow-hidden"
            onClick={isOpen ? null : openModal}
          >
            <ButtonBase className="w-10 h-10  grid place-items-center">
              <GoPlusSmall className="text-2xl" />
            </ButtonBase>
          </div>
        </div>
        <ul className="flex gap-x-12 items-center">
          <li>
            <h1 className="uppercase text-aqua text-2xl">
              <span className="font-bold">lite</span>
              <span>flix</span>
            </h1>
          </li>
          <li className="hidden md:flex">
            <ButtonBase onClick={openModal}>
              <div className="flex items-center p-2">
                <GoPlusSmall className="text-2xl" />
                <span className="uppercase font-thin">agregar película</span>
              </div>
            </ButtonBase>
          </li>
        </ul>

        <ul className="flex gap-x-12 items-center overflow-x-hidden">
          <li className="hidden md:flex rounded-full overflow-hidden">
            <ButtonBase className="h-10 w-10">
              <div className="text-2xl">
                <BiMenuAltRight />
              </div>
            </ButtonBase>
          </li>
          <li className="hidden md:flex rounded-full overflow-hidden">
            <ButtonBase className="h-10 w-10">
              <div className="text-2xl relative">
                <BiBell />
                <div className="bg-aqua w-3 h-3 rounded-full top-0 right-0 absolute" />
              </div>
            </ButtonBase>
          </li>
          <li className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={picture}
              alt="profile picture"
              className="w-full h-full object-cover object-center"
            />
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}

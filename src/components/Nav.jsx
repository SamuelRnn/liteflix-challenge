import picture from "../assets/profile.jpg";
import { GoPlusSmall } from "react-icons/go";
import { BiBell, BiMenuAltRight } from "react-icons/bi";
import ButtonBase from "@mui/material/ButtonBase";

export default function Nav() {
  return (
    <div className="w-main mx-auto flex justify-between h-20">
      <div className="md:hidden flex items-center">
        <div className="rounded-full border border-zinc-300 overflow-hidden">
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
          <ButtonBase>
            <div className="flex items-center p-2">
              <GoPlusSmall className="text-2xl" />
              <span className="uppercase font-thin">agregar película</span>
            </div>
          </ButtonBase>
        </li>
      </ul>

      <ul className="flex gap-x-12 items-center">
        <li className="hidden md:flex rounded-full overflow-hidden">
          <ButtonBase className="h-10 w-10">
            <div className="text-2xl">
              <BiMenuAltRight />
            </div>
          </ButtonBase>
        </li>
        <li className="hidden md:flex rounded-full overflow-hidden">
          <ButtonBase className="h-10 w-10">
            <div className="text-2xl">
              <BiBell />
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
  );
}

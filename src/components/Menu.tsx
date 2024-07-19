"use client";

import { motion } from "framer-motion";
import { navLinks } from "@/constants";
import { Dispatch, SetStateAction } from "react";
import { animateFn, revealMenu, slideinVariant } from "@/lib/animate";
import NavLinks from "./NavLinks";
import { Close } from "@/constants/icons";

type Props = {
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
};

function Menu({ setOpenMenu }: Props) {
  return (
    <motion.div
      style={{ zIndex: 999 }}
      className="fixed inset-0 block h-dvh w-full bg-black/30 backdrop-blur-sm md:hidden"
      {...animateFn(revealMenu)}
      onClick={() => setOpenMenu(false)}
    >
      <motion.div
        {...animateFn(slideinVariant)}
        className="menu flex-column fixed right-0 top-0 isolate h-dvh w-[80%] max-w-[500px] overflow-hidden bg-background px-[4%] text-foreground backdrop-blur-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="icon absolute right-4 top-3 p-1 transition-colors active:scale-95"
          onClick={() => setOpenMenu(false)}
          title="close-menu"
        >
          <Close size="25" className="" fill="#333" />
        </span>

        <nav className="flex-column mx-auto flex-1 gap-8 pt-[10%] text-xl">
          {navLinks.map((link, idx) => (
            <NavLinks
              key={idx}
              {...link}
              menu
              idx={idx}
              setOpenMenu={() => setOpenMenu(false)}
            />
          ))}
        </nav>
      </motion.div>
    </motion.div>
  );
}

export default Menu;

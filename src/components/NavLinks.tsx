import { animateFn, linksAni } from "@/lib/animate";
import { NavLinkProps } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

function NavLinks({ name, href, menu, idx, setOpenMenu }: NavLinkProps) {
  const navlink = "relative p-1 text-base tracking-snug whitespace-nowrap ";
  const menulink = "";

  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      {...(menu && animateFn(linksAni, idx))}
      onClick={() => setOpenMenu && setOpenMenu()}
    >
      <motion.span
        className={twMerge(
          "cursor-pointer capitalize transition-colors transition-sm hover:font-medium hover:text-secondary",
          menu ? menulink : navlink,
          isActive && "font-semibold text-secondary",
        )}
      >
        {name}
      </motion.span>
    </Link>
  );
}

export default NavLinks;

const WrapperComponent = ({
  menu,
  href,
  children,
  onClick,
  ...rest
}: {
  menu?: boolean;
  href: string;
  children: ReactNode;
  onClick: () => void;
  [key: string]: any;
}) => {
  return menu ? (
    <motion.p onClick={onClick} {...rest}>
      {children}
    </motion.p>
  ) : (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
};

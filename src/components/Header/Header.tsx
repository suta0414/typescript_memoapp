"use client";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Header.module.css";
import { NextPage } from "next";
import { usePathname } from "next/navigation";
import { HomeHeaderMenu, IndexHeaderMenu, IndHeaderMenu } from "./HeaderMenu";
import Link from "next/link";

export const Header: NextPage = () => {
  const pathname = usePathname(); // 現在のパスを取得

  // 現在のパスによって異なるヘッダーを設定
  let HeaderMenu;
  if (pathname === "/") {
    HeaderMenu = HomeHeaderMenu;
  } else if (pathname.startsWith("/memoindex")) {
    HeaderMenu = IndexHeaderMenu;
  } else {
    HeaderMenu = IndHeaderMenu;
  }

  return (
    <header className={classes.header}>
      <div>
        <Link href="/">
          <MantineLogo size={28} />
        </Link>
      </div>
      <HeaderMenu />
    </header>
  );
};

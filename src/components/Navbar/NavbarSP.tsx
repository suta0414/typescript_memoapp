import classes from "./Navbar.module.css";
import { Burger, Drawer } from "@mantine/core";
import { useState } from "react";

import { NavbarType } from "@/types";
import { NextPage } from "next";
import { useDisclosure } from "@mantine/hooks";
import { SearchComponent } from "./SearchComponent";
import { Itemlinks } from "./Itemlinks";
import { filteredLists } from "@/src/hooks/filteredLists";

export const NavbarSP: NextPage<NavbarType> = ({ ListItems, sendEditor }) => {
  const [searchValue, setSearchValue] = useState("");
  const [
    isHamburgerOpened,
    { close: hamburgerClose, toggle: hamburgerToggle },
  ] = useDisclosure(false);

  return (
    <div className={classes.sp_navbar_container}>
      <Burger
        opened={isHamburgerOpened}
        onClick={hamburgerToggle}
        // color="#fff"
      />
      <Drawer
        opened={isHamburgerOpened}
        onClose={hamburgerClose}
        withCloseButton={true}
      >
        <SearchComponent
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        ></SearchComponent>
        <nav className={classes.navbar}>
          <Itemlinks
            sendEditor={sendEditor}
            filteredLists={filteredLists(ListItems, searchValue)}
          ></Itemlinks>
        </nav>
      </Drawer>
    </div>
  );
};

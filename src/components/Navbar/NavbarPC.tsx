import classes from "./Navbar.module.css";
import { Flex } from "@mantine/core";
import { useState } from "react";

import { NavbarType } from "@/types";
import { NextPage } from "next";
import { SearchComponent } from "./SearchComponent";
import { Itemlinks } from "./Itemlinks";
import { filteredLists } from "@/src/hooks/filteredLists";

export const NavbarPC: NextPage<NavbarType> = ({ ListItems, sendEditor }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Flex direction="column" gap="md" className={classes.navbar_container}>
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
    </Flex>
  );
};

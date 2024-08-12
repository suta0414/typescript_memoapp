import classes from "./Navbar.module.css";
import { Flex } from "@mantine/core";
import { useState } from "react";

import { NavbarType } from "@/types";
import { NextPage } from "next";
import { SearchComponent } from "./SearchComponent";
import { Itemlinks } from "./Itemlinks";
import { filteredLists } from "@/src/hooks/filteredLists";
import { useInitCheckBoxId } from "@/src/hooks/useInitCheckBoxId";
import { DelBtn } from "../DelBtnProps";

export const NavbarPC: NextPage<NavbarType> = ({
  ListItems,
  sendEditor,
  deleteSubmit,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const { checkedState, setCheckedState } = useInitCheckBoxId(ListItems);
  const trueItem = Object.entries(checkedState)
    .filter(([key, value]) => value)
    .map(([key, value]) => key);

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
          checked={{ checkedState, setCheckedState }}
        ></Itemlinks>
      </nav>
      <DelBtn state={trueItem} deleteFnc={deleteSubmit} type="sum"></DelBtn>
    </Flex>
  );
};

import classes from "./Navbar.module.css";
import { Burger, Drawer } from "@mantine/core";
import { useState } from "react";

import { NavbarType } from "@/types";
import { NextPage } from "next";
import { useDisclosure } from "@mantine/hooks";
import { SearchComponent } from "./SearchComponent";
import { Itemlinks } from "./Itemlinks";
import { filteredLists } from "@/src/hooks/filteredLists";
import { useInitCheckBoxId } from "@/src/hooks/useInitCheckBoxId";
import { DelBtn } from "../DelBtnProps";

export const NavbarSP: NextPage<NavbarType> = ({
  ListItems,
  sendEditor,
  deleteSubmit,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [
    isHamburgerOpened,
    { close: hamburgerClose, toggle: hamburgerToggle },
  ] = useDisclosure(false);

  const { checkedState, setCheckedState } = useInitCheckBoxId(ListItems);
  // チェックが入ったものだけを抽出
  const trueItem = Object.entries(checkedState)
    .filter(([key, value]) => value)
    .map(([key, value]) => key);
  return (
    <div className={classes.sp_navbar_container}>
      <Burger opened={isHamburgerOpened} onClick={hamburgerToggle} />
      <Drawer
        opened={isHamburgerOpened}
        onClose={hamburgerClose}
        withCloseButton={true}
        size="xs"
      >
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
      </Drawer>
    </div>
  );
};

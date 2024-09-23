import classes from "./Navbar.module.css";
import { Drawer } from "@mantine/core";
import { useState } from "react";

import { NavbarType } from "@/types";
import { NextPage } from "next";
import { useDisclosure } from "@mantine/hooks";
import { SearchComponent } from "../SearchBox/SearchComponent";
import { Itemlinks } from "./Itemlinks";
import { filteredItems } from "@/src/hooks/filteredItems";
import { useInitCheckBoxId } from "@/src/hooks/useInitCheckBoxId";
import { BtnFnc } from "../BtnProps";
import { trueItem } from "@/src/hooks/trueItem";

export const NavbarSP: NextPage<NavbarType> = ({
  ListItems,
  sendEditor,
  deleteSubmit,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const { checkedState, setCheckedState } = useInitCheckBoxId(ListItems);

  // チェックが入ったものだけを抽出
  const trueCheckItem = trueItem(checkedState);

  return (
    <div className={classes.sp_navbar_container}>
      <p onClick={open} className={classes.sp_navbar_title}>
        タイトル一覧を表示
      </p>
      {/* <Burger opened={isHamburgerOpened} onClick={hamburgerToggle} /> */}
      <Drawer opened={opened} onClose={close} withCloseButton={true} size="lg">
        <SearchComponent
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        ></SearchComponent>
        <div className={classes.delbtncontainer}>
          <BtnFnc
            state={trueCheckItem}
            fnc={() => deleteSubmit(trueCheckItem)}
            type="sum"
          ></BtnFnc>
        </div>
        <nav className={classes.navbar}>
          <Itemlinks
            sendEditor={sendEditor}
            filteredItems={filteredItems(ListItems, searchValue)}
            checked={{ checkedState, setCheckedState }}
          ></Itemlinks>
        </nav>
      </Drawer>
    </div>
  );
};

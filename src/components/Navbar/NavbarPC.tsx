import classes from "./Navbar.module.css";
import { Flex } from "@mantine/core";
import { useState } from "react";

import { NavbarType } from "@/types";
import { NextPage } from "next";
import { SearchComponent } from "../SearchBox/SearchComponent";
import { Itemlinks } from "./Itemlinks";
import { filteredItems } from "@/src/hooks/filteredItems";
import { useInitCheckBoxId } from "@/src/hooks/useInitCheckBoxId";
import { trueItem } from "@/src/hooks/trueItem";
import { BtnFnc } from "../BtnProps";

export const NavbarPC: NextPage<NavbarType> = ({
  ListItems,
  sendEditor,
  deleteSubmit,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const { checkedState, setCheckedState } = useInitCheckBoxId(ListItems);

  // チェックが入ったものだけを抽出
  const trueCheckItem = trueItem(checkedState);

  return (
    <Flex direction="column" gap="md" className={classes.navbar_container}>
      <SearchComponent
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      ></SearchComponent>
      <BtnFnc
        state={trueCheckItem}
        fnc={() => deleteSubmit(trueCheckItem)}
        type="sum"
      ></BtnFnc>

      <nav className={classes.navbar}>
        <Itemlinks
          sendEditor={sendEditor}
          filteredItems={filteredItems(ListItems, searchValue)}
          checked={{ checkedState, setCheckedState }}
        ></Itemlinks>
      </nav>
    </Flex>
  );
};

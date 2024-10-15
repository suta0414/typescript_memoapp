import classes from "./Navbar.module.css";
import { useRef, useState } from "react";

import { SearchComponent } from "../SearchBox/SearchComponent";
import { Itemlinks } from "./ItemLinks";
import { filteredItems } from "@/src/hooks/FilteredItems";
import { useInitCheckBoxId } from "@/src/hooks/useInitCheckBoxId";
import { BtnFnc } from "../BtnFnc";
import { trueItem } from "@/src/hooks/TrueItem";

type Items = {
  title?: string;
  text?: string;
  tags?: string[];
  id: string;
};

type NavbarType = {
  sendEditor: (item: Items) => void;
  ListItems: Items[];
  deleteSubmit: (idList?: string | object) => void;
};

export const Navbar: React.FC<NavbarType> = ({
  ListItems,
  sendEditor,
  deleteSubmit,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const { checkedState, setCheckedState } = useInitCheckBoxId(ListItems);
  const checkboxRef = useRef<HTMLInputElement>(null);

  // チェックが入ったものだけを抽出
  const trueCheckItem = trueItem(checkedState);

  // 背景をクリックした際にチェックボックスを解除する
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      if (checkboxRef.current) {
        checkboxRef.current.checked = false; // チェックボックスを解除
      }
    }
  };

  return (
    <div className={classes.navbar_container}>
      <input
        type="checkbox"
        id="drawer_toggle"
        ref={checkboxRef}
        className={classes.drawer_toggle}
      />
      <label htmlFor="drawer_toggle" className={classes.sp_navbar_title}>
        タイトル一覧を表示
      </label>

      <div
        className={classes.drawer_background}
        onClick={handleBackgroundClick}
      >
        <div className={classes.drawer}>
          <div className={classes.sp_navbar_x}>
            <label htmlFor="drawer_toggle">×</label>
          </div>
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
        </div>
      </div>
    </div>
  );
};

import classes from "./Navbar.module.css";
import { useRef, useState } from "react";

import { SearchComponent } from "../SearchBox/SearchComponent";
import { Itemlinks } from "./ItemLinks";
import { filteredItems } from "@/src/hooks/FilteredItems";
import { InitCheckBoxId } from "@/src/hooks/InitCheckBoxId";
import { BtnFnc } from "../BtnFnc";

type Items = {
  title?: string;
  text?: string;
  tags?: string[];
  id: string;
};

type NavbarType = {
  sendEditor: (item: Items) => void;
  ListItems: Items[];
  deleteSubmit: (idList: string | object) => void;
};

export const Navbar: React.FC<NavbarType> = ({
  ListItems,
  sendEditor,
  deleteSubmit,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState<Items[]>(ListItems);

  const navbarToggleRef = useRef<HTMLInputElement>(null);

  const initialCheckedState = InitCheckBoxId(ListItems);
  const [checkedState, setCheckedState] = useState(initialCheckedState);

  // ListItems の変更時に items と checkedState を更新
  if (items !== ListItems) {
    setItems(ListItems);
    setCheckedState(initialCheckedState);
  }

  // チェックが入ったものだけを抽出
  const trueCheckItem = Object.entries(checkedState)
    .filter(([key, value]) => value)
    .map(([key, value]) => key);

  // Navbarを閉じる処理
  const handleCloseClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (navbarToggleRef.current) {
      navbarToggleRef.current.checked = false; // チェックボックスを解除
    }
  };

  return (
    <div className={classes.navbar_container}>
      <input
        type="checkbox"
        id="drawer_toggle"
        ref={navbarToggleRef}
        className={classes.drawer_toggle}
      />
      <label htmlFor="drawer_toggle" className={classes.sp_navbar_title}>
        タイトル一覧を表示
      </label>

      <div className={classes.drawer_background} onClick={handleCloseClick}>
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
              fnc={() => {
                deleteSubmit(trueCheckItem);
              }}
              type="sum"
            ></BtnFnc>
          </div>
          <nav className={classes.navbar}>
            <Itemlinks
              sendEditor={sendEditor}
              filteredItems={filteredItems(ListItems, searchValue)}
              checked={{ checkedState, setCheckedState }}
              handleCloseClick={handleCloseClick}
            ></Itemlinks>
          </nav>
        </div>
      </div>
    </div>
  );
};

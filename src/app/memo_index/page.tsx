"use client";

import classes from "./MemoIndex.module.css";

import { useState } from "react";
import { MemoIndex } from "./MemoIndex";
import { SearchComponent } from "@/src/components/SearchBox";
import Link from "next/link";
import { IconPencilPlus } from "@tabler/icons-react";

const PageIndex: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={classes.container}>
      <div className={classes.funcbar}>
        <div className={classes.innner_funcbar}>
          <Link href="/" className={classes.newlink}>
            <IconPencilPlus size={16} className={classes.newicon} />
            新規作成
          </Link>
          <SearchComponent
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          ></SearchComponent>
        </div>
      </div>
      <h2 className={classes.title}>メモ一覧</h2>

      <MemoIndex searchValue={searchValue}></MemoIndex>
    </div>
  );
};

export default PageIndex;

"use client";

import classes from "./MemoIndex.module.css";

import { useEffect, useState } from "react";
import { MemoIndex } from "./MemoIndex";
import Link from "next/link";
import { IconPencilPlus } from "@tabler/icons-react";
import { SearchComponent } from "@/src/components/SearchBox";
import { firstLocalStorage } from "@/src/hooks/FirstLocalStorage";

type Items = {
  title?: string;
  text?: string;
  tags?: string[];
  id: string;
};

const PageIndex: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const [items, setItems] = useState<Items[]>([]);

  // 初回レンダリング時にlocalStorageからデータを取得
  useEffect(() => {
    const parsedItems = firstLocalStorage();
    setItems(parsedItems);
  }, []);

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

      {items.length > 0 ? (
        <div className={classes.card_wrapper}>
          <MemoIndex items={items} searchValue={searchValue}></MemoIndex>
        </div>
      ) : (
        <p className={classes.nomemo}>メモがありません</p>
      )}
    </div>
  );
};

export default PageIndex;

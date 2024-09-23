"use client";

import classes from "./memoindex.module.css";

import { Suspense, useEffect, useState } from "react";
import { NextPage } from "next";
import { ItemIndex } from "./ItemIndex";
import { Items } from "@/types";
import Link from "next/link";
import { IconPencilPlus } from "@tabler/icons-react";
import { SearchComponent } from "@/src/components/SearchBox";
import { firstLocalStorage } from "@/src/hooks/firstLocalStorage";
import Loading from "../loading";

const PageIndex: NextPage = () => {
  const [searchValue, setSearchValue] = useState("");

  const [items, setItems] = useState<Items[]>([]);

  // 初回レンダリング時にlocalStorageからデータを取得
  useEffect(() => {
    const parsedItems = firstLocalStorage();
    // console.log(parsedItems);
    setItems(parsedItems);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.funcbar}>
        <div className={classes.innner_funcbar}>
          <Link href="/" className={classes.newlink}>
            <IconPencilPlus size={16} />
            新規作成
          </Link>
          <SearchComponent
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          ></SearchComponent>
        </div>
      </div>
      <h2 className={classes.title}>メモ一覧</h2>
      <Suspense fallback={<Loading />}>
        {items ? (
          <div className={classes.card_wrapper}>
            <ItemIndex items={items} searchValue={searchValue}></ItemIndex>
          </div>
        ) : (
          <p className={classes.nomemo}>メモがありません</p>
        )}
      </Suspense>
    </div>
  );
};
export default PageIndex;

"use client";

import { MantineProvider } from "@mantine/core";
import classes from "./page.module.css";
import { NavbarPC, NavbarSP } from "../components/Navbar";
import { TextEditor } from "../components/TextEditor";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Items, MemoAppProps } from "@/types";
import { NextPage } from "next";
import { useViewportSize } from "@mantine/hooks";
import Loading from "./loading";

const Home: NextPage = () => {
  const [items, setItems] = useState<Items[]>([]);
  const [content, setContent] = useState({});
  const { height, width } = useViewportSize();

  let key = "ItemList";
  // 初回レンダリング時にlocalStorageからデータを取得
  useEffect(() => {
    const getVal = window.localStorage.getItem(key);
    if (getVal) {
      try {
        const parsedItems = JSON.parse(getVal);
        if (Array.isArray(parsedItems)) {
          setItems(parsedItems);
        }
      } catch (e) {
        console.error("Failed to parse localStorage data", e);
      }
    }
  }, []);

  // itemsが更新されるたびにlocalStorageを更新
  useEffect(() => {
    if (items.length > 0) {
      window.localStorage.setItem(key, JSON.stringify(items));
    }
  }, [items]);

  // エディタの内容をitemsに追加
  const AddItemList: MemoAppProps["AddItemList"] = (ItemList) => {
    const { titleValue, sentence, tagValue, ID } = ItemList;
    const index = items.findIndex((item) => item.id === ID);
    setContent("");
    if (index !== -1) {
      // IDが存在する場合、そのオブジェクトを上書
      items[index] = {
        title: titleValue,
        text: sentence,
        tags: tagValue,
        id: ID,
      };
    } else {
      setItems((prevItems) => {
        return [
          ...prevItems,
          {
            title: titleValue,
            text: sentence,
            tags: tagValue,
            id: ID,
          },
        ];
      });
    }
  };

  // 新規作成を押したとき
  const resetContent: MemoAppProps["resetContent"] = useCallback(() => {
    setContent("");
  }, []);

  // itemsから削除
  const deleteSubmit: MemoAppProps["deleteSubmit"] = (idList) => {
    setContent("");
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== idList);
    });
  };

  // Navbarの内容をEditorに送る
  const sendEditor: MemoAppProps["sendEditor"] = (item) => {
    setContent(item);
  };

  // windowサイズで分ける
  const Navbar: NextPage = () => {
    if (width < 1024) {
      return <NavbarSP ListItems={items} sendEditor={sendEditor} />;
    } else {
      return <NavbarPC ListItems={items} sendEditor={sendEditor} />;
    }
  };

  return (
    <MantineProvider>
      <div className={classes.page_container}>
        <Suspense fallback={<Loading />}>
          <Navbar></Navbar>
        </Suspense>
        <TextEditor
          AddItemList={AddItemList}
          Items={content}
          resetContent={resetContent}
          deleteSubmit={deleteSubmit}
        />
      </div>
    </MantineProvider>
  );
};

export default Home;

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
import { useSearchParams } from "next/navigation";
import { firstLocalStorage } from "../hooks/firstLocalStorage";

const Home: NextPage = () => {
  const searchParams = useSearchParams();

  const [items, setItems] = useState<Items[]>([]);
  const [content, setContent] = useState({});
  const { height, width } = useViewportSize();
  const [tagList, setTagList] = useState<string[]>([]);

  const id = searchParams.get("id");

  // 初回レンダリング時にlocalStorageからデータを取得
  useEffect(() => {
    const parsedItems = firstLocalStorage();
    setItems(parsedItems);

    // タグのリストを作成
    const allTags = parsedItems.reduce((acc: string[], item) => {
      if (item.tags && item.tags.length > 0) {
        acc.push(...item.tags);
      }
      return acc;
    }, []);
    // 重複を排除してtagListに追加
    setTagList((prevTagList) => {
      const newTagList = [...prevTagList, ...allTags];
      return [...new Set(newTagList)]; // Setを使って重複を排除
    });

    // 個別ページから来た時
    if (parsedItems && id) {
      const foundItem = parsedItems.find((item) => item.id === id);
      if (foundItem) {
        setContent(foundItem);
      }
    }
  }, []);

  // itemsが更新されるたびにlocalStorageを更新
  useEffect(() => {
    if (items.length >= 0) {
      const key = "ItemList";
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
      setItems((prevItems) =>
        prevItems.map((item, i) =>
          i === index
            ? {
                ...item,
                title: titleValue,
                text: sentence,
                tags: tagValue,
                id: ID,
              }
            : item
        )
      );
    } else {
      // IDが存在しない場合、新しいオブジェクトを追加
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
    //まとめて削除の時
    if (Array.isArray(idList) && typeof idList === "object") {
      setItems((prevItems) => {
        return prevItems.filter((item) => !idList.includes(item.id));
      });
    } else if (typeof idList === "string") {
      // 個別削除
      setItems((prevItems) => {
        return prevItems.filter((item) => item.id !== idList);
      });
    } else {
      console.log("型不一致");
    }
  };

  // Navbarの内容をEditorに送る
  const sendEditor: MemoAppProps["sendEditor"] = (item) => {
    setContent(item);
  };

  // windowサイズで分ける
  const Navbar: NextPage = () => {
    if (width <= 1024) {
      return (
        <NavbarSP
          ListItems={items}
          sendEditor={sendEditor}
          deleteSubmit={deleteSubmit}
        />
      );
    } else {
      return (
        <NavbarPC
          ListItems={items}
          sendEditor={sendEditor}
          deleteSubmit={deleteSubmit}
        />
      );
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
          sendItems={content}
          resetContent={resetContent}
          deleteSubmit={deleteSubmit}
          itemTagList={{ tagList, setTagList }}
        />
      </div>
    </MantineProvider>
  );
};

export default Home;

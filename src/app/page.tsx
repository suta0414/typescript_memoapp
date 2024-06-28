"use client";

import { MantineProvider } from "@mantine/core";
import classes from "./page.module.css";
import { NavbarPC, NavbarSP } from "../components/Navbar";
import { TextEditor } from "../components/TextEditor";
import { Suspense, useCallback, useState } from "react";
import { MemoAppProps } from "@/types";
import { NextPage } from "next";
import { useViewportSize } from "@mantine/hooks";
import Loading from "./loading";

const Home: NextPage = () => {
  const data = [
    { title: "abc", text: "bbb", tags: ["java"], id: "sdfhh" },
    { title: "Notifications", text: "aaa", tags: ["react"], id: "sddd" },
    { title: "tyu", text: "bbb", tags: ["java"], id: "sdfhhdh" },
  ];

  const [items, setItems] = useState(data);
  const [content, setContent] = useState({});
  const { height, width } = useViewportSize();

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

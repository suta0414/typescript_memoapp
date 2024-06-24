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

  const Navbar: NextPage = () => {
    if (width < 1024) {
      return <NavbarSP ListItems={items} sendEditor={sendEditor} />;
    } else {
      return <NavbarPC ListItems={items} sendEditor={sendEditor} />;
    }
  };

  const AddItemList: MemoAppProps["AddItemList"] = (
    TitleValue,
    sentence,
    TagValue,
    Id
  ) => {
    const index = items.findIndex((item) => item.id === Id);
    setContent("");
    if (!TitleValue) TitleValue = "未タイトル";
    if (index !== -1) {
      // IDが存在する場合、そのオブジェクトを上書
      items[index] = {
        title: TitleValue,
        text: sentence,
        tags: TagValue,
        id: Id,
      };
    } else {
      setItems((prevItems) => {
        return [
          ...prevItems,
          {
            title: TitleValue,
            text: sentence,
            tags: TagValue,
            id: Id,
          },
        ];
      });
    }
  };

  const resetContent: MemoAppProps["resetContent"] = useCallback(() => {
    setContent("");
  }, []);

  const deleteSubmit: MemoAppProps["deleteSubmit"] = (idList) => {
    setContent("");
    const index = items.findIndex((item) => item.id === idList);
    if (index !== -1) {
      setItems((prevItems) => {
        return prevItems.filter((prevItem) => prevItem !== prevItems[index]);
      });
    }
  };

  const sendEditor: MemoAppProps["sendEditor"] = (item) => {
    setContent(item);
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

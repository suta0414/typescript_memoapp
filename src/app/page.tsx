"use client";

import { MantineProvider } from "@mantine/core";
import { Navbar } from "../components/Navbar";
import { Flex } from "@mantine/core";
import { TextEditor } from "../components/TextEditor";
import { Header } from "../components/Header";
import { FC, useCallback, useEffect, useState } from "react";
import escapeStringRegexp from "escape-string-regexp";
import { MemoAppProps } from "@/types";
import { NextPage } from "next";

const Home = () => {
  const data = [
    { title: "abc", text: "bbb", tags: ["java"], id: "sdfhh" },
    { title: "Notifications", text: "aaa", tags: ["react"], id: "sddd" },
    { title: "tyu", text: "bbb", tags: ["java"], id: "sdfhhdh" },
  ];

  const [items, setItems] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const [content, setContent] = useState({});

  const handleSubmit: MemoAppProps["handleSubmit"] = useCallback(
    (TitleValue, sentence, TagValue, Id) => {
      const index = items.findIndex((item) => item.id === Id);
      setContent("");
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
    },
    [items]
  );

  const resetContent: MemoAppProps["resetContent"] = useCallback(() => {
    setContent("");
  }, []);

  const deleteSubmit: MemoAppProps["deleteSubmit"] = useCallback(
    (idList) => {
      setContent("");
      const index = items.findIndex((item) => item.id === idList);
      if (index !== -1) {
        setItems((prevItems) => {
          return prevItems.filter((prevItem) => prevItem !== prevItems[index]);
        });
      }
    },
    [items]
  );

  const InputSearchValue: MemoAppProps["inputSearchValue"] = useCallback(
    (searchText) => {
      setSearchValue(searchText);
    },
    []
  );

  const filteredLists = items.filter((item) => {
    if (!searchValue) return true;
    // ユーザー入力を安全に正規表現にする（このときすべて小文字化で正規化する）
    const searchText = escapeStringRegexp(searchValue.toLowerCase());
    const itemText = escapeStringRegexp(item.title.toLowerCase());
    // 小文字で比較して部分一致するものだけを残す
    return new RegExp(`^${searchText}`).test(itemText);
  });

  // const filteredLists = useCallback(() => {
  //   items.filter((item) => {
  //     if (!searchValue) return true;
  //     // ユーザー入力を安全に正規表現にする（このときすべて小文字化で正規化する）
  //     const searchText = escapeStringRegexp(searchValue.toLowerCase());
  //     const itemText = escapeStringRegexp(item.title.toLowerCase());
  //     // 小文字で比較して部分一致するものだけを残す
  //     // return new RegExp(`^${searchText}`).test(itemText);
  //     const Itemlist = new RegExp(`^${searchText}`).test(itemText);
  //     console.log(Itemlist);
  //     return Itemlist;
  //   });
  // }, [items, searchValue]);

  const sendEditor: MemoAppProps["sendEditor"] = useCallback((item) => {
    setContent(item);
  }, []);

  return (
    <MantineProvider>
      <Header />
      <Flex gap="md">
        <Navbar
          inputSearchValue={InputSearchValue}
          FilterItems={filteredLists}
          sendEditor={sendEditor}
        />
        <TextEditor
          handleSubmit={handleSubmit}
          listItems={content}
          resetContent={resetContent}
          deleteSubmit={deleteSubmit}
        />
      </Flex>
    </MantineProvider>
  );
};

export default Home;

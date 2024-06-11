"use client";

import { MantineProvider } from "@mantine/core";
import { Navbar } from "../components/Navbar";
import { Flex } from "@mantine/core";
import { TextEditor } from "../components/TextEditor";
import { useCallback, useState } from "react";
import { MemoAppProps } from "@/types";
import { NextPage } from "next";

const Home: NextPage = () => {
  const data = [
    { title: "abc", text: "bbb", tags: ["java"], id: "sdfhh" },
    { title: "Notifications", text: "aaa", tags: ["react"], id: "sddd" },
    { title: "tyu", text: "bbb", tags: ["java"], id: "sdfhhdh" },
  ];

  const [items, setItems] = useState(data);
  const [content, setContent] = useState({});

  const handleSubmit: MemoAppProps["handleSubmit"] = (
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
      <Flex gap="md">
        <Navbar ListItems={items} sendEditor={sendEditor} />
        <TextEditor
          handleSubmit={handleSubmit}
          Items={content}
          resetContent={resetContent}
          deleteSubmit={deleteSubmit}
        />
      </Flex>
    </MantineProvider>
  );
};

export default Home;

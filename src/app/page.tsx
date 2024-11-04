"use client";

import { MantineProvider } from "@mantine/core";
import classes from "./page.module.css";
import { TextEditor } from "../components/TextEditor";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import useLocalStorageState from "use-local-storage-state";

type SendEditor = (item: Items) => void;

type DeleteSubmit = (idList: string | object) => void;

type ResetContent = () => void;

type Items = {
  title?: string;
  text?: string;
  tags?: string[];
  id: string;
};

type AddItemList = (ItemList: {
  titleValue: string;
  sentence: string;
  tagValue: string[];
  ID: string;
}) => void;

const Home: React.FC = () => {
  const [content, setContent] = useState<Items>();
  const [tagList, setTagList] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const individualId = searchParams.get("id");

  const [items, setItems] = useLocalStorageState<Items[]>("ItemLists", {
    defaultValue: [],
  });

  const [prevItems, setPrevItems] = useState<Items[]>();

  // itemsの変更時
  if (items !== prevItems) {
    setPrevItems(items);
    // タグのリストを作成
    const allTags = items.reduce((acc: string[], item) => {
      if (item.tags && item.tags.length > 0) {
        acc.push(...item.tags);
      }
      return acc;
    }, []);

    setTagList((prevTagList) => {
      const newTagList = [...prevTagList, ...allTags];
      return [...new Set(newTagList)]; // 重複を排除
    });
  }

  // 個別ページからのアクセス時
  if (individualId && !content) {
    const foundItem = items.find((item) => item.id === individualId);
    if (foundItem) {
      setContent(foundItem);
    }
  }

  // エディタの内容をitemsに追加
  const addItemList: AddItemList = (ItemList) => {
    const { titleValue, sentence, tagValue, ID } = ItemList;
    const index = items.findIndex((item) => item.id === ID);
    setContent({} as Items);
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
  const resetContent: ResetContent = () => {
    setContent({} as Items);
  };

  // itemsから削除
  const deleteSubmit: DeleteSubmit = (idList) => {
    setContent({} as Items);
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
  const sendEditor: SendEditor = (item) => {
    setContent(item);
  };

  return (
    <MantineProvider>
      <div className={classes.page_container}>
        <Navbar
          ListItems={items}
          sendEditor={sendEditor}
          deleteSubmit={deleteSubmit}
        ></Navbar>
        <TextEditor
          addItemList={addItemList}
          sendItems={content}
          resetContent={resetContent}
          deleteSubmit={deleteSubmit}
          itemTagList={{ tagList, setTagList }}
          individualId={individualId}
        />
      </div>
    </MantineProvider>
  );
};

export default Home;

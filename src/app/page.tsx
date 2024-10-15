"use client";

import { MantineProvider } from "@mantine/core";
import classes from "./page.module.css";
import { TextEditor } from "../components/TextEditor";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { firstLocalStorage } from "../hooks/FirstLocalStorage";
import { Navbar } from "../components/Navbar/Navbar";

type SendEditor = (item: Items) => void;

type DeleteSubmit = (idList?: string | object) => void;

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
  const [items, setItems] = useState<Items[]>([]);
  const [content, setContent] = useState({});
  const [tagList, setTagList] = useState<string[]>([]);

  const [isClient, setIsClient] = useState(false); // クライアント側判定
  const [isLoaded, setIsLoaded] = useState(false); // localStorageが読み込まれたかを判定
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // クライアントサイドでのみ実行
  useEffect(() => {
    setIsClient(true);
  }, []);

  // localStorageのデータを取得
  useEffect(() => {
    if (isClient && !isLoaded) {
      // 読み込みが完了していない場合のみ実行
      const parsedItems = firstLocalStorage();
      if (parsedItems) {
        try {
          setItems(parsedItems);
          // console.log("Items loaded from localStorage:", parsedItems);

          // タグのリストを作成
          const allTags = parsedItems.reduce((acc: string[], item) => {
            if (item.tags && item.tags.length > 0) {
              acc.push(...item.tags);
            }
            return acc;
          }, []);

          setTagList((prevTagList) => {
            const newTagList = [...prevTagList, ...allTags];
            return [...new Set(newTagList)]; // 重複を排除
          });

          // 個別ページからのアクセス時
          if (parsedItems && id) {
            const foundItem = parsedItems.find((item) => item.id === id);
            if (foundItem) {
              setContent(foundItem);
            }
          }

          setIsLoaded(true); // 読み込み完了をマーク
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
        }
      }
    }
  }, [isClient, id, isLoaded]);

  // itemsが変更されたときのみlocalStorageを更新
  useEffect(() => {
    if (isClient && isLoaded && items.length > 0) {
      window.localStorage.setItem("ItemList", JSON.stringify(items));
    }
  }, [items, isClient, isLoaded]); // itemsが変更されるたびに保存

  // エディタの内容をitemsに追加
  const addItemList: AddItemList = (ItemList) => {
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
  const resetContent: ResetContent = () => {
    setContent("");
  };

  // itemsから削除
  const deleteSubmit: DeleteSubmit = (idList) => {
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
        />
      </div>
    </MantineProvider>
  );
};

export default Home;

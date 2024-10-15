import classes from "./TextEditor.module.css";

import { useEffect, useState } from "react";
import React from "react";
import { TitleErea } from "./TitleErea";
import { TextArea } from "./TextArea";
import { TagArea } from "./TagArea";
import { IdCreate } from "@/src/hooks/IdCreate";

type SendItems = {
  title?: string;
  text?: string;
  tags?: string[];
  id?: string;
};

type AddItemList = (ItemList: {
  titleValue: string;
  sentence: string;
  tagValue: string[];
  ID: string;
}) => void;

type TextEditorProps = {
  addItemList: AddItemList;
  resetContent: () => void;
  deleteSubmit: (idList?: string | object) => void;
  sendItems: SendItems;
  itemTagList: {
    tagList: string[];
    setTagList: React.Dispatch<React.SetStateAction<string[]>>;
  };
};

export const TextEditor: React.FC<TextEditorProps> = ({
  addItemList,
  sendItems,
  resetContent,
  deleteSubmit,
  itemTagList,
}) => {
  const [titleValue, setTitleValue] = useState("");
  const [tagValue, setTagValue] = useState([""]);
  const [sentence, setSentence] = useState("");

  const [id, setId] = useState("");

  const { tagList, setTagList } = itemTagList;

  // 新規作成をクリックしたとき
  const resetbutton = () => {
    setTitleValue("");
    setSentence("");
    setTagValue([]);

    resetContent();
  };

  // 保存したとき
  const sendbutton = (id: string) => {
    const ID = IdCreate(id);
    if (!titleValue) setTitleValue("未タイトル");
    const ItemList = { titleValue, sentence, tagValue, ID };
    addItemList(ItemList);
    setTitleValue("");
    setSentence("");
    setTagList([...new Set([...tagList, ...tagValue])]);
    setTagValue([]);
    setId("");
  };

  // 削除をクリックしたとき
  const deletebutton = () => {
    deleteSubmit(id);

    setTitleValue("");
    setSentence("");
    setTagValue([]);
    setId("");
  };

  // Navbarをクリックしたとき
  useEffect(() => {
    setTitleValue(sendItems.title || "");
    setSentence(sendItems.text || "");
    setTagValue(sendItems.tags || []);
    setId(sendItems.id || "");
  }, [sendItems]);

  return (
    <div className={classes.container}>
      <TitleErea
        Title={{ titleValue, setTitleValue }}
        resetbutton={resetbutton}
        deletebutton={deletebutton}
        id={id}
      ></TitleErea>
      <TextArea Sentence={{ sentence, setSentence }}></TextArea>
      <TagArea
        Tag={{ tagValue, setTagValue }}
        tagList={tagList}
        id={id}
        sendbutton={sendbutton}
        title={titleValue}
      ></TagArea>
    </div>
  );
};

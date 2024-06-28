import classes from "./TextEditor.module.css";

import { useEffect, useState } from "react";
import { MemoAppProps } from "@/types";
import React from "react";
import { NextPage } from "next";
import { TitleErea } from "./TitleErea";
import { TextArea } from "./TextArea";
import { TagArea } from "./TagArea";
import { IdCreate } from "@/src/hooks/IdCreate";

export const TextEditor: NextPage<Omit<MemoAppProps, "sendEditor">> = ({
  AddItemList,
  Items,
  resetContent,
  deleteSubmit,
}) => {
  const [titleValue, setTitleValue] = useState("");
  const [tagValue, setTagValue] = useState([""]);
  const [sentence, setSentence] = useState("");

  const [tagList, setTagList] = useState(["react", "java"]);
  const [id, setId] = useState("");

  const resetbutton = () => {
    setTitleValue("");
    setSentence("");
    setTagValue([]);

    resetContent();
  };

  const sendbutton = (id: string) => {
    const ID = IdCreate(id);
    if (!titleValue) setTitleValue("未タイトル");
    const ItemList = { titleValue, sentence, tagValue, ID };
    AddItemList(ItemList);
    setTitleValue("");
    setSentence("");
    setTagList([...new Set([...tagList, ...tagValue])]);
    setTagValue([]);
    setId("");
  };

  const deletebutton = () => {
    deleteSubmit(id);

    setTitleValue("");
    setSentence("");
    setTagValue([]);
    setId("");
  };

  useEffect(() => {
    setTitleValue(Items.title || "");
    setSentence(Items.text || "");
    setTagValue(Items.tags || []);
    setId(Items.id || "");
  }, [Items]);

  return (
    <div className={classes.container}>
      <TitleErea
        Title={{ titleValue, setTitleValue }}
        resetbutton={resetbutton}
      ></TitleErea>
      <TextArea Sentence={{ sentence, setSentence }}></TextArea>
      <TagArea
        Tag={{ tagValue, setTagValue }}
        tagList={tagList}
        id={id}
        sendbutton={sendbutton}
        deletebutton={deletebutton}
      ></TagArea>
    </div>
  );
};

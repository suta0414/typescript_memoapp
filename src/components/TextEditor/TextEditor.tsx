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
    AddItemList(titleValue, sentence, tagValue, ID);
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

  //   extensions: [
  //     StarterKit,
  //     Underline,
  //     Link,
  //     Superscript,
  //     SubScript,
  //     Highlight,
  //     TextAlign.configure({ types: ["heading", "paragraph"] }),
  //   ],
  //   listItem: sentence,
  //   onUpdate: ({ editor }) => setSentence(editor.getHTML()),
  // });

  // if (editor) {
  //   editor.on("update", () => {
  //     setSentence(editor.getText());
  //   });
  // }

  // if (!editor) {
  //   return null;
  // }
  // setSentence(editor?.getText());

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
        titleValue={titleValue}
        sendbutton={sendbutton}
        deletebutton={deletebutton}
      ></TagArea>
    </div>
  );
};

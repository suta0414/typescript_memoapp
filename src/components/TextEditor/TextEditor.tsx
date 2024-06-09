import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";

import classes from "./TextEditor.module.css";
import { Box, Button, TextInput, Textarea } from "@mantine/core";
import { TagsInput } from "@mantine/core";
import { useEffect, useState } from "react";
import type { FC } from "react";
import { MemoAppProps } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { NextPage } from "next";

export const TextEditor: NextPage<
  Pick<
    MemoAppProps,
    "handleSubmit" | "listItems" | "resetContent" | "deleteSubmit"
  >
> = ({ handleSubmit, listItems, resetContent, deleteSubmit }) => {
  const [TitleValue, setTitleValue] = useState("");
  const [sentence, setSentence] = useState("");
  const [TagValue, setTagValue] = useState([""]);
  const [tagList, setTagList] = useState(["react", "java"]);
  const [idList, setIdList] = useState("");

  const generateRandomID = (): string => {
    return uuidv4();
  };

  // const editor = useEditor({
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

  const idcheck = (idList: string) => {
    if (!idList) {
      const ID = generateRandomID();
      return ID;
    } else {
      const ID = idList;
      return ID;
    }
  };

  const sendbutton = () => {
    const ID = idcheck(idList);
    handleSubmit(TitleValue, sentence, TagValue, ID);
    setTitleValue("");
    setSentence("");
    setTagList([...new Set([...tagList, ...TagValue])]);
    setTagValue([]);
    // setIdList("");
  };

  const resetbutton = () => {
    setTitleValue("");
    setSentence("");
    setTagValue([]);
    // setIdList("");

    resetContent();
  };

  const deletebutton = () => {
    deleteSubmit(idList);

    setTitleValue("");
    setSentence("");
    setTagValue([]);
  };

  useEffect(() => {
    setTitleValue(listItems.title || "");
    setSentence(listItems.text || "");
    setTagValue(listItems.tags || []);
    setIdList(listItems.id || "");
  }, [listItems]);

  return (
    <div className={classes.container}>
      <div className={classes.titlearea}>
        <h2 className={classes.title}>
          <TextInput
            size="md"
            radius="sm"
            placeholder="タイトル"
            withAsterisk
            value={TitleValue}
            onChange={(event) => setTitleValue(event.currentTarget.value)}
          />
        </h2>
        <Button
          variant="filled"
          size="md"
          radius="sm"
          color="blue"
          onClick={() => resetbutton()}
        >
          新規作成
        </Button>
      </div>
      <div className={classes.editor}>
        <Textarea
          size="md"
          placeholder="本文"
          autosize
          minRows={8}
          value={sentence}
          onChange={(event) => setSentence(event.currentTarget.value)}
        />
        {/* <RichTextEditor editor={editor}>
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Undo />
              <RichTextEditor.Redo />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor> */}
      </div>

      <Box className={classes.u_editor}>
        <TagsInput
          data={tagList}
          placeholder="タグ"
          className={classes.tag}
          value={TagValue}
          onChange={setTagValue}
        />
      </Box>
      <Box className={classes.u_btn}>
        <Button
          variant="filled"
          size="lg"
          radius="sm"
          color="red"
          className={classes.btn}
          onClick={() => sendbutton()}
        >
          保存
        </Button>
        <Button
          variant="filled"
          size="lg"
          radius="sm"
          color="green"
          className={classes.delbtn}
          onClick={() => deletebutton()}
        >
          削除
        </Button>
      </Box>
    </div>
  );
};

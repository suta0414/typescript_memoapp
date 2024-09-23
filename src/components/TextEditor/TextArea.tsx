import { Textarea } from "@mantine/core";
import classes from "./TextEditor.module.css";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";

type TextAreaType = {
  Sentence: {
    sentence: string;
    setSentence: Dispatch<SetStateAction<string>>;
  };
};

// テキスト部分
export const TextArea: NextPage<TextAreaType> = ({ Sentence }) => {
  const { sentence, setSentence } = Sentence;
  return (
    <div className={classes.editor}>
      <Textarea
        size="md"
        placeholder="本文"
        autosize
        minRows={8}
        value={sentence}
        onChange={(event) => setSentence(event.currentTarget.value)}
      />
    </div>
  );
};

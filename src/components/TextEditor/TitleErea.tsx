import classes from "./TextEditor.module.css";
import { Button, TextInput } from "@mantine/core";

import React, { Dispatch, SetStateAction } from "react";
import { NextPage } from "next";

type TitleEreaType = {
  Title: {
    titleValue: string;
    setTitleValue: Dispatch<SetStateAction<string>>;
  };
  resetbutton: () => void;
};

export const TitleErea: NextPage<TitleEreaType> = ({ Title, resetbutton }) => {
  const { titleValue, setTitleValue } = Title;

  return (
    <div className={classes.titlearea}>
      <h2 className={classes.title}>
        <TextInput
          size="md"
          radius="sm"
          placeholder="タイトル"
          withAsterisk
          value={titleValue}
          onChange={(event) => setTitleValue(event.currentTarget.value)}
        />
      </h2>

      <Button
        variant="filled"
        size="md"
        radius="sm"
        color="blue"
        // onClick={() => reset()}
        onClick={() => resetbutton()}
      >
        新規作成
      </Button>
    </div>
  );
};

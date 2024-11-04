import classes from "./TextEditor.module.css";
import { TextInput } from "@mantine/core";

import { IconPencilPlus } from "@tabler/icons-react";
import { BtnFnc } from "../BtnFnc";
import { Dispatch, SetStateAction } from "react";

type TitleEreaType = {
  Title: {
    titleValue: string;
    setTitleValue: Dispatch<SetStateAction<string>>;
  };
  resetbutton: () => void;
  deletebutton: () => void;
  id: string;
};

// タイトル部分
export const TitleErea: React.FC<TitleEreaType> = ({
  Title,
  resetbutton,
  deletebutton,
  id,
}) => {
  const { titleValue, setTitleValue } = Title;

  return (
    <div className={classes.titlearea}>
      <h2 className={classes.title}>
        <TextInput
          size="md"
          radius="sm"
          placeholder="タイトル*"
          withAsterisk
          value={titleValue}
          // maxLength={16}
          onChange={(event) => setTitleValue(event.currentTarget.value)}
        />
      </h2>

      <div className={classes.funcbar}>
        <div onClick={() => resetbutton()} className={classes.newbtn}>
          <IconPencilPlus size={20} className={classes.newicon} />
          <p>新規作成</p>
        </div>
        <BtnFnc state={id} fnc={deletebutton} type="one"></BtnFnc>
      </div>
    </div>
  );
};

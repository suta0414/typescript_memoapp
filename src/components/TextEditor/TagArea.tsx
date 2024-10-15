import { TagsInput } from "@mantine/core";
import classes from "./TextEditor.module.css";
import { Dispatch, SetStateAction } from "react";
import { BtnFnc } from "../BtnFnc";

type TagAreaType = {
  Tag: {
    tagValue: string[];
    setTagValue: Dispatch<SetStateAction<string[]>>;
  };
  tagList: string[];
  id: string;
  sendbutton: (id: string) => void;
  title: string;
};

// タグ部分
export const TagArea: React.FC<TagAreaType> = ({
  Tag,
  tagList,
  id,
  sendbutton,
  title,
}) => {
  const { tagValue, setTagValue } = Tag;

  return (
    <div className={classes.u_editor}>
      <TagsInput
        data={tagList}
        placeholder="タグ"
        className={classes.tag}
        value={tagValue}
        onChange={setTagValue}
      />

      <div className={classes.u_btn}>
        <BtnFnc state={title} fnc={() => sendbutton(id)} type="save"></BtnFnc>
      </div>
    </div>
  );
};

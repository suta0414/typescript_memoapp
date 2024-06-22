import { Box, Button } from "@mantine/core";
import { TagsInput } from "@mantine/core";
import classes from "./TextEditor.module.css";
import { Dispatch, SetStateAction } from "react";
import { NextPage } from "next";
import { DelBtn } from "./DelBtnModal";

type TagAreaType = {
  Tag: {
    tagValue: string[];
    setTagValue: Dispatch<SetStateAction<string[]>>;
  };
  tagList: string[];
  id: string;
  titleValue: string;
  sendbutton: (id: string) => void;
  deletebutton: () => void;
};

export const TagArea: NextPage<TagAreaType> = ({
  Tag,
  tagList,
  id,
  titleValue,
  sendbutton,
  deletebutton,
}) => {
  const { tagValue, setTagValue } = Tag;

  return (
    <div>
      <Box className={classes.u_editor}>
        <TagsInput
          data={tagList}
          placeholder="タグ"
          className={classes.tag}
          value={tagValue}
          onChange={setTagValue}
        />

        <Box className={classes.u_btn}>
          <Button
            variant="filled"
            size="lg"
            radius="sm"
            color="red"
            className={classes.btn}
            onClick={() => sendbutton(id)}
          >
            保存
          </Button>
        </Box>
      </Box>
      <Box className={classes.delbtncontainer}>
        <DelBtn titleValue={titleValue} deletebutton={deletebutton}></DelBtn>
      </Box>
    </div>
  );
};

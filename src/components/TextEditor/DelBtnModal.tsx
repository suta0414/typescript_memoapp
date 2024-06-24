import { Button, Flex, Modal } from "@mantine/core";
import classes from "./TextEditor.module.css";
import { useDisclosure } from "@mantine/hooks";
import { NextPage } from "next";

type DelBtnType = {
  id: string;
  deletebutton: () => void;
};

export const DelBtn: NextPage<DelBtnType> = ({ id, deletebutton }) => {
  const [opened, { open, close }] = useDisclosure(false);

  if (!id) {
    return (
      <Button
        disabled
        variant="filled"
        size="md"
        radius="sm"
        color="green"
        className={classes.delbtn}
      >
        削除
      </Button>
    );
  } else {
    return (
      <div>
        <Button
          onClick={open}
          variant="filled"
          size="md"
          radius="sm"
          color="green"
          className={classes.delbtn}
        >
          削除
        </Button>
        <Modal
          opened={opened}
          onClose={close}
          title="削除して良いですか？"
          centered
        >
          <Flex justify="center" align="center" gap="lg">
            <Button
              variant="filled"
              size="md"
              radius="sm"
              color="red"
              className={classes.addbtn}
              onClick={() => {
                deletebutton();
                close();
              }}
            >
              はい
            </Button>
            <Button
              variant="filled"
              size="md"
              radius="sm"
              color="blue"
              className={classes.delbtn}
              onClick={close}
            >
              いいえ
            </Button>
          </Flex>
        </Modal>
      </div>
    );
  }
};

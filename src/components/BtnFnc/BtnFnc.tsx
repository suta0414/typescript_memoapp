import { Button, Flex, Modal } from "@mantine/core";
import classes from "./BtnProps.module.css";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceFloppy, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

type BtnFnc = {
  state: string | string[];
  fnc: () => void;
  type: string;
};

export const BtnFnc: React.FC<BtnFnc> = ({ state, fnc, type }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [checkState, setrCheckState] = useState(true);

  // まとめて削除
  if (type === "sum") {
    if ((state && state.length === 0) || !checkState) {
      return (
        <div>
          <Button
            leftSection={<IconTrash size={18} />}
            disabled
            variant="filled"
            size="md"
            radius="sm"
            color="green"
            className={classes.dissumdelbtn}
          >
            まとめて削除
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button
            leftSection={<IconTrash size={20} />}
            onClick={open}
            variant="filled"
            size="md"
            radius="sm"
            color="green"
            className={classes.sumdelbtn}
          >
            まとめて削除
          </Button>
          <Modal
            opened={opened}
            onClose={close}
            title={`${state.length}個削除して良いですか？`}
            centered
          >
            <Flex justify="center" align="center" gap="lg">
              <Button
                variant="default"
                size="md"
                radius="sm"
                className={classes.delbtn}
                onClick={close}
              >
                キャンセル
              </Button>
              <Button
                variant="filled"
                size="md"
                radius="sm"
                color="red"
                className={classes.addbtn}
                onClick={() => {
                  fnc();
                  setrCheckState(false);
                  close();
                }}
              >
                削除
              </Button>
            </Flex>
          </Modal>
        </div>
      );
    }
  }
  // 個別削除
  if (type === "one") {
    if (!state) {
      return (
        <div className={classes.disableddelete}>
          <IconTrash size={18} className={classes.trashicon} />
          <p>削除</p>
        </div>
      );
    } else {
      return (
        <div>
          <div onClick={open} className={classes.delbtn}>
            <IconTrash size={18} className={classes.trashicon} />
            <p>削除</p>
          </div>
          <Modal
            opened={opened}
            onClose={close}
            title="削除して良いですか？"
            centered
          >
            <Flex justify="center" align="center" gap="lg">
              <Button
                variant="default"
                size="md"
                radius="sm"
                className={classes.delbtn}
                onClick={close}
              >
                キャンセル
              </Button>
              <Button
                variant="filled"
                size="md"
                radius="sm"
                color="red"
                className={classes.addbtn}
                onClick={() => {
                  fnc();
                  close();
                }}
              >
                削除
              </Button>
            </Flex>
          </Modal>
        </div>
      );
    }
  }
  // 保存
  if (type === "save") {
    if (!state) {
      return (
        <div>
          <Button
            leftSection={
              <IconDeviceFloppy style={{ marginTop: "2px" }} size={20} />
            }
            disabled
            variant="filled"
            size="lg"
            radius="sm"
            color="red"
            className={classes.savebtn}
          >
            保存
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button
            leftSection={
              <IconDeviceFloppy style={{ marginTop: "2px" }} size={20} />
            }
            variant="filled"
            size="lg"
            radius="sm"
            color="red"
            className={classes.savebtn}
            onClick={fnc}
          >
            保存
          </Button>
        </div>
      );
    }
  }
};

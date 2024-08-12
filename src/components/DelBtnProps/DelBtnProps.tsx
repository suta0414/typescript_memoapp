import { Button, Flex, Modal } from "@mantine/core";
import classes from "./DelBtnProps.module.css";
import { useDisclosure } from "@mantine/hooks";
import { NextPage } from "next";
import { DelBtnProps } from "@/types";

export const DelBtn: NextPage<DelBtnProps> = ({ state, deleteFnc, type }) => {
  const [opened, { open, close }] = useDisclosure(false);

  if (type === "sum") {
    if (state && state.length === 0) {
      return (
        <Button
          disabled
          variant="filled"
          size="md"
          radius="sm"
          color="green"
          className={classes.dissumdelbtn}
        >
          まとめて削除
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
                variant="filled"
                size="md"
                radius="sm"
                color="red"
                className={classes.addbtn}
                onClick={() => {
                  deleteFnc(state);
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
  }

  if (type === "one") {
    if (!state) {
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
                  deleteFnc();
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
  }
};

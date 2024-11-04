"use client";

import classes from "./Indivisual.module.css";

import { Button, Flex, Modal, Text, Title } from "@mantine/core";
import Link from "next/link";
import { IconEdit, IconArrowLeft, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import useLocalStorageState from "use-local-storage-state";

type Props = {
  params: {
    id: string;
  };
};

type Items = {
  title?: string;
  text?: string;
  tags?: string[];
  id: string;
};

const Indivisual = ({ params }: Props) => {
  const { id } = params;

  const [opened, { open, close }] = useDisclosure(false);

  const [items, setItems] = useLocalStorageState<Items[]>("ItemLists", {
    defaultValue: [],
  });

  // 特定のIDを持つアイテムを取得
  const selectedItem = Object.values(items).find((item) => item.id === id);

  // アイテムを削除
  const deleteItem = () => {
    const updatedItem = items.filter((item) => item.id !== id);
    setItems(updatedItem);
  };

  const Content = () => {
    return (
      <div>
        {selectedItem ? (
          <div>
            <div className={classes.titleerea}>
              <div className={classes.left_titleerea}>
                {selectedItem.title ? (
                  <Title order={2} lineClamp={1} className={classes.title}>
                    {selectedItem.title}
                  </Title>
                ) : (
                  ""
                )}
              </div>

              <div className={classes.edit}>
                <Link href={`/?id=${id}`}>
                  <IconEdit className={classes.edit_icon} />
                  編集
                </Link>
              </div>
            </div>
            <div className={classes.tag}>
              {selectedItem.tags
                ? selectedItem.tags.map((tag) => (
                    <Text size="sm" className={classes.tag_content} key={tag}>
                      #{tag}
                    </Text>
                  ))
                : ""}
            </div>
            <div className={classes.text}>
              {selectedItem.text ? <p>{selectedItem.text}</p> : ""}
            </div>
            <div className={classes.delete}>
              <div className={classes.deletebtn} onClick={open}>
                <IconTrash className={classes.deleteicon} />
                <p>削除</p>
              </div>
            </div>
            {DeleteModal()}
          </div>
        ) : (
          <p>表示する情報がありません</p>
        )}
      </div>
    );
  };

  const DeleteModal = () => {
    return (
      <div>
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
            <Link href={"/delete"}>
              <Button
                variant="filled"
                size="md"
                radius="sm"
                color="red"
                className={classes.addbtn}
                onClick={() => {
                  deleteItem();
                  close();
                }}
              >
                削除
              </Button>
            </Link>
          </Flex>
        </Modal>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      {Content()}
      <div className={classes.returnlink}>
        <Link href={`/memo_index`}>
          <IconArrowLeft stroke={2} className={classes.arrowicon} />
          メモ一覧
        </Link>
      </div>
    </div>
  );
};

export default Indivisual;

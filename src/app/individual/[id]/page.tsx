"use client";

import classes from "./indivisual.module.css";

import { Button, Flex, Modal, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconEdit, IconArrowLeft, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { firstLocalStorage } from "@/src/hooks/FirstLocalStorage";

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

  const [items, setItems] = useState<Items[]>();
  const [selectedItem, setSelectedItem] = useState<Items[]>();
  const [opened, { open, close }] = useDisclosure(false);

  // 初回レンダリング時にlocalStorageからデータを取得
  useEffect(() => {
    const parsedItems = firstLocalStorage();
    setItems(parsedItems);
  }, []);

  // 特定のIDを持つアイテムを取得
  useEffect(() => {
    if (items) {
      const foundItem = Object.values(items).find((item) => item.id === id);
      setSelectedItem(foundItem ? [foundItem] : undefined);
    }
  }, [id, items]);

  // アイテムを削除
  const deleteItem = () => {
    if (items) {
      const updatedItem = items.filter((item) => item.id !== id);
      localStorage.setItem("ItemList", JSON.stringify(updatedItem));
    }
  };

  return (
    <div className={classes.container}>
      {selectedItem && selectedItem.length === 1 ? (
        <div>
          <div className={classes.titleerea}>
            <div className={classes.left_titleerea}>
              {selectedItem[0].title ? (
                <Title order={2} lineClamp={1} className={classes.title}>
                  {selectedItem[0].title}
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
            {selectedItem[0].tags
              ? selectedItem[0].tags.map((tag) => (
                  <Text size="sm" className={classes.tag_content} key={tag}>
                    #{tag}
                  </Text>
                ))
              : ""}
          </div>
          <div className={classes.text}>
            {selectedItem[0].text ? <p>{selectedItem[0].text}</p> : ""}
          </div>
        </div>
      ) : (
        <p>表示する情報がありません</p>
      )}
      <div className={classes.delete} onClick={open}>
        <div className={classes.deletebtn}>
          <IconTrash className={classes.deleteicon} />
          <p>削除</p>
        </div>
      </div>

      <Link href={`/memoindex`} className={classes.returnlink}>
        <IconArrowLeft stroke={2} className={classes.arrowicon} />
        メモ一覧
      </Link>

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
    </div>
  );
};

export default Indivisual;

import classes from "./MemoIndex.module.css";

import { Title, Card, Text } from "@mantine/core";

import Link from "next/link";
import { filteredItems } from "@/src/hooks/FilteredItems";
import { useState } from "react";

import useLocalStorageState from "use-local-storage-state";
type Items = {
  title?: string;
  text?: string;
  tags?: string[];
  id: string;
};

type ItemPropsType = {
  searchValue: string;
};

export const MemoIndex: React.FC<ItemPropsType> = ({ searchValue }) => {
  const [items, setItems] = useLocalStorageState<Items[]>("ItemLists", {
    defaultValue: [],
  });
  const [showItems, setShowItems] = useState<Items[]>(items);

  const [prevSearchValue, setPrevSearchValue] = useState(searchValue);

  // 検索の際の処理
  if (searchValue !== prevSearchValue) {
    setPrevSearchValue(searchValue);
    setShowItems(filteredItems(items, searchValue));
  }

  const MemoIndex = () => {
    return showItems.map((item) => {
      return (
        <div key={item.id} className={classes.card}>
          <Link href={`/individual/${item.id}`}>
            <Card
              shadow="sm"
              padding="xs"
              radius="md"
              withBorder
              className={classes.carditem}
            >
              <Card.Section withBorder inheritPadding py="xs">
                <Title order={3} lineClamp={1} className={classes.cardtitle}>
                  {item.title}
                </Title>
              </Card.Section>
              <Card.Section withBorder inheritPadding py="xs">
                <p className={classes.cardtext}>{item.text}</p>
              </Card.Section>
              <Card.Section
                withBorder
                inheritPadding
                py="xs"
                className={classes.cardtag}
              >
                {item.tags
                  ? item.tags.map((tag) => (
                      <Text key={tag} size="xs" truncate="end">
                        #{tag}
                      </Text>
                    ))
                  : ""}
              </Card.Section>
            </Card>
          </Link>
        </div>
      );
    });
  };

  return (
    <div>
      {items.length > 0 ? (
        <div className={classes.card_wrapper}>{MemoIndex()}</div>
      ) : (
        <p className={classes.nomemo}>メモがありません</p>
      )}
    </div>
  );
};

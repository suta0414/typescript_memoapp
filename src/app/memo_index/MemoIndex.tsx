import classes from "./MemoIndex.module.css";

import { Title, Card, Text } from "@mantine/core";

import Link from "next/link";
import { filteredItems } from "@/src/hooks/FilteredItems";
import { Suspense, useEffect, useState } from "react";

import Loading from "../loading";
type Items = {
  title?: string;
  text?: string;
  tags?: string[];
  id: string;
};

type ItemPropsType = {
  items: Items[];
  searchValue: string;
};

export const MemoIndex: React.FC<ItemPropsType> = ({ items, searchValue }) => {
  const [showItems, setShowItems] = useState<Items[]>([]);

  useEffect(() => {
    setShowItems(filteredItems(items, searchValue));
  }, [items, searchValue]);

  const memo_Index = () => {
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
      <Suspense fallback={<Loading />}>{memo_Index()}</Suspense>
    </div>
  );
};

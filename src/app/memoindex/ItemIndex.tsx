import classes from "./memoindex.module.css";

import { Title } from "@mantine/core";
import { Card, Text } from "@mantine/core";

import { NextPage } from "next";
import Link from "next/link";
import { filteredItems } from "@/src/hooks/filteredItems";
import { Suspense, useEffect, useState } from "react";
import { Items } from "@/types";
import Loading from "../loading";

type ItemPropsType = {
  items: Items[];
  searchValue: string;
};

export const ItemIndex: NextPage<ItemPropsType> = ({ items, searchValue }) => {
  const [showItems, setShowItems] = useState<Items[]>([]);

  useEffect(() => {
    setShowItems(filteredItems(items, searchValue));
  }, [items, searchValue]);

  const links = showItems.map((item) => {
    return (
      <div key={item.id} className={classes.card}>
        <Suspense fallback={<Loading />}>
          <Link href={`/individual/${item.id}`}>
            <Card
              shadow="sm"
              padding="xs"
              radius="md"
              withBorder
              className={classes.carditem}
            >
              <Card.Section
                withBorder
                inheritPadding
                py="xs"
                // className={classes.cardtitle}
              >
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
        </Suspense>
      </div>
    );
  });
  return links;
};

import classes from "./delete.module.css";

import { Flex } from "@mantine/core";
import Link from "next/link";

const Delete = () => {
  return (
    <div className={classes.container}>
      <h2>削除しました</h2>
      <Flex justify="center" align="center" gap="lg">
        <Link href={"/memo_index"} className={classes.delete_link}>
          メモ一覧ページへ
        </Link>
        <Link href={"/"} className={classes.delete_link}>
          編集ページへ
        </Link>
      </Flex>
    </div>
  );
};

export default Delete;

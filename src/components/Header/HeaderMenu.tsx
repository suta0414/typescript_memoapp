import Link from "next/link";
import classes from "./Header.module.css";

export const HomeHeaderMenu = () => {
  return (
    <nav>
      <ul className={classes.navmenu}>
        <li>
          <Link href={`/memoindex`}>メモ一覧</Link>
        </li>
      </ul>
    </nav>
  );
};
export const IndexHeaderMenu = () => {
  return (
    <nav>
      <ul className={classes.navmenu}>
        <li>
          <Link href={`/`}>編集ページ</Link>
        </li>
      </ul>
    </nav>
  );
};
export const IndHeaderMenu = () => {
  return (
    <nav>
      <ul className={classes.navmenu}>
        <li>
          <Link href={`/`}>編集ページ</Link>
        </li>
        <li>
          <Link href={`/memoindex`}>メモ一覧</Link>
        </li>
      </ul>
    </nav>
  );
};

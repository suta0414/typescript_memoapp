import { IconTag } from "@tabler/icons-react";

import classes from "./Navbar.module.css";
import { Checkbox, NavLink } from "@mantine/core";

type Items = {
  title?: string;
  text?: string;
  tags?: string[];
  id: string;
};

type CheckedProps = {
  checkedState: { [key: string]: boolean };
  setCheckedState: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
};

type ItemlinksType = {
  sendEditor: (item: Items) => void;
  filteredItems: Items[];
  checked: CheckedProps;
  handleCloseClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const Itemlinks: React.FC<ItemlinksType> = ({
  sendEditor,
  filteredItems,
  checked,
  handleCloseClick,
}) => {
  const { checkedState, setCheckedState } = checked;

  // チェックボックスの処理
  const toggleCheckbox = (id: string) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const item_Links = () => {
    return filteredItems.map((filterItem) => {
      return (
        <div key={filterItem.id} className={classes.navlink}>
          <Checkbox
            size="xs"
            checked={checkedState[filterItem.id] || false}
            onChange={() => toggleCheckbox(filterItem.id)}
          />
          <NavLink
            className={classes.link}
            label={filterItem.title}
            leftSection={<IconTag className={classes.linkIcon} stroke={2} />}
            noWrap={true}
            onClick={() => {
              sendEditor(filterItem);
              handleCloseClick;
            }}
          />
        </div>
      );
    });
  };

  return <div>{item_Links()}</div>;
};

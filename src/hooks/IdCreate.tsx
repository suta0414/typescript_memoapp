import { v4 as uuidv4 } from "uuid";

export const IdCreate = (idList: string) => {
  const generateRandomID = (): string => {
    return uuidv4();
  };

  const idcheck = (idList: string) => {
    // IDがないとき作成
    if (!idList) {
      const ID = generateRandomID();
      return ID;
    } else {
      // IDが存在するときはそのIDを返す
      const ID = idList;
      return ID;
    }
  };

  return idcheck(idList);
};

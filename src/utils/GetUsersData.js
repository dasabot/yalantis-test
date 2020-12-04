import { letters } from "./constLetters";

export function getUsersData(data) {
  return letters.reduce((acc, letter) => {
    return {
      ...acc,
      [letter]: data.filter((user) => user.lastName[0] === letter),
    };
  }, {});
}

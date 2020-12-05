import { letters } from "./contants";

export function formatData(data) {
  return letters.reduce((acc, letter) => {
    return {
      ...acc,
      [letter]: data.filter((user) => user.lastName[0] === letter),
    };
  }, {});
}

import { letters, months } from "./contants";

export function formatData(data) {
  return letters.reduce((acc, letter) => {
    return {
      ...acc,
      [letter]: data.filter((user) => user.lastName[0] === letter),
    };
  }, {});
}

export function getFullDate(date) {
  return `${new Date(date).getDate()} ${
    months[new Date(date).getMonth()]
  }, ${new Date(date).getFullYear()} year`;
}

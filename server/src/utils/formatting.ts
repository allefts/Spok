import { ACTION } from "../types";

export const actionToEmoji = (action: ACTION) => {
  switch (action) {
    case "walk":
      return "🛣️";
    case "rest":
      return "🏕️";
    case "eat":
      return "🍓";
    case "drink":
      return "💧";
  }
};

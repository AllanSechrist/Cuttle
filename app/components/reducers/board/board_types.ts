import type { PlayingCards } from "~/types";

export type Board = {
  playerOnePoints: PlayingCards[];
  playerTwoPoints: PlayingCards[];
  playerOneEffects: PlayingCards[];
  playerTwoEffects: PlayingCards[];
  stack: PlayingCards[];
};

export type Action =
  | { type: "REMOVE_CARD"; cardCode: string }
  | { type: "ADD_CARD"; cardCode: string }
  | { type: "CLEAR_BOARD"; };

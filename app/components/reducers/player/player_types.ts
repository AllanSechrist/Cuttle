import type { PlayingCards } from "~/types";

export type PlayerState = {
  name: string;
  score: number;
  hand: PlayingCards[];
  isTurn: boolean;
  dealer: boolean;
};
export type Action =
  | { type: "UPDATE_SCORE"; amount: number }
  | { type: "DRAW_CARD"; card: PlayingCards }
  | { type: "INITIAL_HAND"; cards: PlayingCards[]}
  | { type: "END_TURN" }
  | { type: "RESET_HAND" }
  | { type: "RESET_PLAYER" };
// "PLAY_CARD"

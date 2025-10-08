import type { PlayerState } from "~/components/reducers/player/player_types";
export type GameContextType = {
  savedDeck: string;
  deck: boolean;
  remainingCardsInDeck: number;
  playerOne: PlayerState,
  playerTwo: PlayerState,
  handlePlayerHandReset: () => Promise<void>;
  handleGameStart: () => Promise<void>;
  handlePlayCard: (cardCode: string) => Promise<void>;
  dealCards: (deck_id: string) => Promise<void>;
}

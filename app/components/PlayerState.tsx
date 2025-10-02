import { useReducer } from "react";
import { playerReducer } from "~/game_logic/game_objects/player";
import type { PlayerState } from "~/game_logic/game_objects/player_types";

export default function PlayerStateManager() {
  const initialPlayer: PlayerState = {
    name: "playerOne",
    score: 0,
    hand: [],
    isTurn: false,
    dealer: false
  }

  const [player, dispatch] = useReducer(playerReducer, initialPlayer)

  return (<></>)
}

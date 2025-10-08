import type { PlayerState, Action } from "./player_types";



export function playerReducer(state: PlayerState, action: Action): PlayerState {
  switch (action.type) {
    case "UPDATE_SCORE":
      return { ...state, score: state.score + action.amount };
    case "DRAW_CARD":
      return { ...state, hand: [...state.hand, action.card] };
    case "INITIAL_HAND":
      return { ...state, hand: action.cards}
    case "END_TURN":
      return { ...state, isTurn: false };
    case "RESET_PLAYER":
      return { name: state.name, score: 0, hand: [], isTurn: false, dealer: false };
    case "RESET_HAND":
      return {...state, hand:[]};
    default:
      return state
  }
}

export function PlayerOne() {
  const initialPlayer: PlayerState = {
    name: "playerOne",
    score: 0,
    hand: [],
    isTurn: false,
    dealer: true
  }
  return initialPlayer
}

export function PlayerTwo() {
  const initialPlayer: PlayerState = {
    name: "playerTwo",
    score: 0,
    hand: [],
    isTurn: true,
    dealer: false
  }
  return initialPlayer
}

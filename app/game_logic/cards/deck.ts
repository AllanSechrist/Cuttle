import type { Deck, DrawResponse, PlayingCards } from "~/types";

const BASE_URL = import.meta.env.VITE_CARD_API_BASE;

export async function CreateNewDeck():Promise<Deck> {
  const res = await fetch(`${BASE_URL}/new/shuffle/?deck_count=1`)
  const data = await (res.json()) as Deck;

  return data
}
export async function DrawCards(deck_id: string, count="1"):Promise<PlayingCards[]> {
  // returns a draw response from the API. This includes information about the card(s)
  // the deck id and how many cards remain in the deck after the draw.
  const res = await fetch(`${BASE_URL}/${deck_id}/draw/?count=${count}`)
  const data = await (res.json()) as DrawResponse;

  return data.cards
}

export async function ShuffleDeck(deck:string, remaining=true):Promise<Deck> {
  // if remaining is set to false, shuffle ALL cards back into the deck.
  const res = await fetch(`${BASE_URL}/${deck}/shuffle/?remaining=${remaining}`)
  const data = await (res.json()) as Deck;

  return data
}

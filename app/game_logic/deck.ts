import type { Deck, DrawResponse } from "~/types";

const BASE_URL = import.meta.env.VITE_CARD_API_BASE;

export async function NewDeck():Promise<Deck> {
  const res = await fetch(`${BASE_URL}/new`)
  const data = await (res.json()) as Deck;

  return data
}
export async function DrawCard(deck_id: string, count="1"):Promise<DrawResponse> {
  // returns a draw response from the API. This includes information about the card(s)
  // the deck id and how many cards remain in the deck after the draw.
  const res = await fetch(`${BASE_URL}/${deck_id}/draw/?count=${count}`)
  const data = await (res.json()) as DrawResponse;

  return data
}

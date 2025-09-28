import type { Deck } from "~/types";

export async function NewDeck():Promise<Deck> {
  const res = await fetch(`${import.meta.env.VITE_CARD_API_BASE}/new`)
  const data = await (res.json()) as Deck;

  return data
}

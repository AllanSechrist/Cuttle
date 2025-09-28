import { DrawCards } from "./deck";
import type { PileResponse, DrawResponse, PlayingCards } from "~/types";
const BASE_URL = import.meta.env.VITE_CARD_API_BASE;
// a pile is a stack of cards that is NOT the deck
// a pile can be used for player hands, discard piles etc, etc.
// AFTER a card has been drawn from the deck, it can be moved into any pile.

export async function AddToPile(
  // This function will also create a new pile if [name] does not already exist.
  deck_id: string,
  name: string,
  cardData: DrawResponse
): Promise<PileResponse> {
  const cards = cardData.cards.join(",");
  const res = await fetch(
    `${BASE_URL}/${deck_id}/pile/${name}/add/?cards=${cards}`
  );
  const data = (await res.json()) as PileResponse;
  return data;
}

export async function GetPileList(
  deck_id: string,
  name: string
): Promise<PlayingCards[]> {
  const res = await fetch(`${BASE_URL}/${deck_id}/pile/${name}/list/`);
  const data = (await res.json()) as PileResponse;
  return data.piles[name]?.cards ?? [];
}

export async function ShufflePile(
  deck_id: string,
  name: string
): Promise<PileResponse> {
  const res = await fetch(`${BASE_URL}/${deck_id}/pile/${name}/shuffle/}`);
  const data = (await res.json()) as PileResponse;
  return data;
}

export type PlayingCard = {
  code: string;
  image: string;
  images: object;
  value: string;
  suit: string;
}

export type DrawResponse = {
  success: boolean,
  deck_id: string,
  cards: PlayingCard[],
  remaining: number
}

export type Deck = {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

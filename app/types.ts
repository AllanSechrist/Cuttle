export type PlayingCards = {
  code: string;
  image: string;
  images: object;
  value: string;
  suit: string;
}

export type DrawResponse = {
  success: boolean,
  deck_id: string,
  cards: PlayingCards[],
  remaining: number
}

export type DrawResult = {
  cards: PlayingCards[],
  remaining: number
}

export type Deck = {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

export type Pile = {
  remaining: number;
  cards?: PlayingCards[];
}

export type Piles = Record<string, Pile>;

export type PileResponse = {
  success: boolean,
  deck_id: string,
  remaining: number,
  piles: Piles
}

export type ReturnCardsResponse = {
  success: boolean,
  deck_id: string,
  shuffled: true,
  remaining: number,
  piles: Piles
}

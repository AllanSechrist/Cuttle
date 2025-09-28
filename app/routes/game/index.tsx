import { NewDeck } from "~/game_logic/deck";
import { DrawCard } from "~/game_logic/deck";
import type { Deck } from "~/types";
import type { PlayingCard } from "~/types";
import Card from "~/components/Card";
import { useState } from "react";

const GamePage = () => {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [card, setCard] = useState<PlayingCard | null>(null);

  const handleNewDeck = async () => {
    const data = await NewDeck();
    setDeck(data);
  }

  const handleDrawCard = async () => {
    if (deck !== null) {
      const data = await DrawCard(deck.deck_id);
      const drawnCard = data.cards[0]
      setCard(drawnCard);
    }
  }

  return ( <div>
    <button>New Deck</button>
  </div> );
}

export default GamePage;

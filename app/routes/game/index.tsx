import { CreateNewDeck } from "~/game_logic/cards/deck";
import { DrawCards } from "~/game_logic/cards/deck";
import type { Deck } from "~/types";
import type { PlayingCards } from "~/types";
import Card from "~/components/Card";
import Button from "~/components/Button";
import { useState } from "react";


const GamePage = () => {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [card, setCard] = useState<PlayingCards | null>(null);

  const handleNewDeck = async () => {
    const data = await CreateNewDeck();
    setDeck(data);
  };

  const handleDrawCard = async () => {
    if (deck !== null) {
      const data = await DrawCards(deck.deck_id);
      const drawnCard = data.cards[0];
      setCard(drawnCard);
    }
  };

  return (
    <div>
      {deck === null ? (
        <Button handleClick={handleNewDeck} buttonType="deck">New Deck</Button>
      ) : (
        <Button handleClick={handleDrawCard} buttonType="draw">Draw a Card</Button>
      )}
      {card !== null && <Card card={card}/>}
    </div>
  );
};

export default GamePage;

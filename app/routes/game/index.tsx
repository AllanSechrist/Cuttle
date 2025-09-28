import { CreateNewDeck, DrawCards } from "~/game_logic/cards/deck";
import { AddToPile, GetPileList } from "~/game_logic/cards/pile";
import type { Pile, Deck } from "~/types";
import type { PlayingCards } from "~/types";
import Card from "~/components/Card";
import Button from "~/components/Button";
import { useState } from "react";

const GamePage = () => {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [playerOneHand, setPlayerOneHand] = useState<Pile | null>(null);
  const [playerTwoHand, setPlayerTwoHand] = useState<Pile | null>(null);
  // for now, playerOne will always be the dealer.
  // randomize in the future.
  const [dealer, setDealer] = useState("playerOne");
  // player opposite the dealer always goes first
  const [playerTurn, setPlayerTurn] = useState("playerTwo");
  // move to own file?
  const playerList = [
    {
      player: "playerOne",
      hand: playerOneHand,
      score: 0,
      setHand: (newHand: PlayingCards[]) => setPlayerOneHand,
    },
    {
      player: "playerTwo",
      hand: playerTwoHand,
      score: 0,
      setHand: (newHand: PlayingCards[]) => setPlayerTwoHand,
    },
  ];

  const handleNewDeck = async () => {
    const data = await CreateNewDeck();
    setDeck(data);
  };

  // const handleDrawCard = async () => {
  //   if (deck !== null) {
  //     const data = await DrawCards(deck.deck_id);
  //     const drawnCard = data.cards[0];
  //     setCard(drawnCard);
  //   }
  // };

  const handleGameStart = async () => {
    if (deck !== null) {
      // create a shuffled new deck
      const newDeck = await CreateNewDeck();
      setDeck(newDeck);
      // deal cards out to players
      if (deck !== null) {
        const drawnCards = await DrawCards(deck.deck_id)
      }
      // dealer gets 5 cards, opponent gets 6 cards

      // the player opposite the dealer always plays first
    }
  };

  return <div></div>;
};

export default GamePage;

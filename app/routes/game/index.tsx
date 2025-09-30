import {
  CreateNewDeck,
  DrawCards,
  ReturnCardsToDeck,
} from "~/game_logic/cards/deck";
import { AddToPile, GetPileCards } from "~/game_logic/cards/pile";
import type { Pile, Deck } from "~/types";
import type { PlayingCards } from "~/types";
import Card from "~/components/Card";
import Button from "~/components/Button";
import { useState } from "react";
import { useLocalStorage } from "~/components/hooks/useLocalStorage";

const GamePage = () => {
  // CHANGE TO DECK OBJECT
  const [savedDeck, setSavedDeck] = useLocalStorage("savedDeck", "");
  const [deck, setDeck] = useState<boolean>(false);
  const [remainingCardsInDeck, setRemainingCardsInDeck] = useState<number>(0);
  // CHANGE TO PLAYER OBJECT
  const [playerOneHand, setPlayerOneHand] = useState<PlayingCards[] | []>([]);
  const [playerTwoHand, setPlayerTwoHand] = useState<PlayingCards[] | []>([]);
  const [playerOneScore, setPlayerOneScore] = useState<number>(0)
  const [playerTwoScore, setPlayerTwoScore] = useState<number>(0)
  // for now, playerOne will always be the dealer.
  // randomize in the future.
  const [dealer, setDealer] = useState("playerOne");
  // player opposite the dealer always goes first
  const [playerTurn, setPlayerTurn] = useState("playerTwo");
  // move to own file? Track with state?
  const players = [
    'playerOne', 'playerTwo'
  ];

  const handleDeckReset = async () => {
    // return playerOne cards to deck
    const data = await ReturnCardsToDeck(savedDeck, players[0]);
    setPlayerOneHand([]);
    // return playerTwo cards to deck
    await ReturnCardsToDeck(savedDeck, players[1]);
    setPlayerTwoHand([]);
    // return discard pile to deck
    // return cards in play to deck (board state)
    setRemainingCardsInDeck(data.remaining);
  };

  const dealCards = async () => {
    const drawCount = "11";
    // deal cards out to players
    const drawData = await DrawCards(savedDeck, drawCount);

    setRemainingCardsInDeck(drawData.remaining);

    const dealerCards = drawData.cards.slice(6);
    const opponentCards = drawData.cards.slice(0, 6);
    // dealer gets 5 cards, opponent gets 6 cards
    await AddToPile(savedDeck, players[0], dealerCards);
    await AddToPile(savedDeck, players[1], opponentCards);
    // set player hands
    const dealerHand = await GetPileCards(savedDeck, players[0]);
    const opponentHand = await GetPileCards(savedDeck, players[1]);
    setPlayerOneHand(dealerHand);
    setPlayerTwoHand(opponentHand);
  };

  const handleGameStart = async () => {
    let deckId = null;
    //check if we need to create a new deck
    if (savedDeck === "") {
      const newDeck = await CreateNewDeck();
      // setDeckData(newDeck);
      setSavedDeck(newDeck.deck_id);
      deckId = newDeck.deck_id;
      //DEBUG
      console.log(`New deck ID ${savedDeck}`);
    } else {
      deckId = savedDeck;
      //DEBUG
      console.log(`Local Storage deck ID ${savedDeck}`);
    }

    setDeck(true);
    dealCards();
    // the player opposite the dealer always plays first
  };

  return (
    <div>
      {!deck ? (
        <Button handleClick={handleGameStart} buttonType="deck">
          Start Game
        </Button>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 bg-base-300">
          <div className="flex items-center justify-center">
            {playerOneHand.length > 0 ? (
              playerOneHand.map((card) => <Card key={card.code} card={card} />)
            ) : (
              <p>Hand is empty</p>
            )}
          </div>
          <div className="flex items-center justify-center">
            {playerTwoHand.length > 0 ? (
              playerTwoHand.map((card) => <Card key={card.code} card={card} />)
            ) : (
              <p>Hand is empty</p>
            )}
          </div>
          <div className="flex space-x-4">
            <h2>Cards in deck {remainingCardsInDeck}</h2>
            <Button handleClick={handleDeckReset} buttonType="reset">
              Reset Deck
            </Button>
            <Button handleClick={dealCards} buttonType="deck">
              New Game?
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;

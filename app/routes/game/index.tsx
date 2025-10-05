import {
  CreateNewDeck,
  DrawCards,
  ReturnCardsToDeck,
} from "~/game_logic/cards/deck";
import { AddToPile, GetPileCards } from "~/game_logic/cards/pile";
import Card from "~/components/Card";
import Button from "~/components/Button";
import { useState, useReducer } from "react";
import {
  playerReducer,
  PlayerOne,
  PlayerTwo,
} from "~/components/reducers/player";
import { useLocalStorage } from "~/components/hooks/useLocalStorage";

const GamePage = () => {
  // CHANGE TO DECK OBJECT
  const [savedDeck, setSavedDeck] = useLocalStorage("savedDeck", "");
  const [deck, setDeck] = useState<boolean>(false);
  const [remainingCardsInDeck, setRemainingCardsInDeck] = useState<number>(0);
  const [playerOne, playerOneDispatch] = useReducer(playerReducer, PlayerOne());
  const [playerTwo, playerTwoDispatch] = useReducer(playerReducer, PlayerTwo());

  const dealCards = async (deck_id: string) => {
    const drawCount = "11";
    // deal cards out to players
    const drawData = await DrawCards(savedDeck, drawCount);

    setRemainingCardsInDeck(drawData.remaining);

    const dealerCards = drawData.cards.slice(6);
    const opponentCards = drawData.cards.slice(0, 6);
    // dealer gets 5 cards, opponent gets 6 cards
    await AddToPile(deck_id, playerOne.name, dealerCards);
    await AddToPile(deck_id, playerTwo.name, opponentCards);
    // set player hands
    const dealerHand = await GetPileCards(savedDeck, playerOne.name);
    const opponentHand = await GetPileCards(savedDeck, playerTwo.name);
    playerOneDispatch({ type: "INITIAL_HAND", cards: dealerHand });
    playerTwoDispatch({ type: "INITIAL_HAND", cards: opponentHand });
  };

  const handleDeckReset = async () => {
    // return playerOne cards to deck
    await ReturnCardsToDeck(savedDeck, playerOne.name);
    playerOneDispatch({ type: "RESET_HAND" });
    // return playerTwo cards to deck
    const data = await ReturnCardsToDeck(savedDeck, playerTwo.name);
    playerTwoDispatch({ type: "RESET_HAND" });
    // return discard pile to deck
    // return cards in play to deck (board state)
    setRemainingCardsInDeck(data.remaining);
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
    await dealCards(deckId);
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
            {playerOne.hand.length > 0 ? (
              playerOne.hand.map((card) => <Card key={card.code} card={card} />)
            ) : (
              <p>Hand is empty</p>
            )}
          </div>
          <div className="flex items-center justify-center">
            {playerTwo.hand.length > 0 ? (
              playerTwo.hand.map((card) => <Card key={card.code} card={card} />)
            ) : (
              <p>Hand is empty</p>
            )}
          </div>
          <div className="flex space-x-4">
            <h2>Cards in deck {remainingCardsInDeck}</h2>
            <Button handleClick={handleDeckReset} buttonType="reset">
              Reset Deck
            </Button>
            <Button handleClick={() => dealCards(savedDeck)} buttonType="deck">
              New Game?
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;

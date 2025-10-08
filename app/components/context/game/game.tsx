import {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { playerReducer, PlayerOne, PlayerTwo } from "../../reducers/player/player";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { AddToPile, GetPileCards } from "~/game_logic/cards/pile";
import {
  CreateNewDeck,
  DrawCards,
  ReshuffleCards,
} from "~/game_logic/cards/deck";
import type { PlayingCards } from "~/types";
import type { GameContextType } from "./gameContextTypes";
import type { ReactNode } from "react";

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [savedDeck, setSavedDeck] = useLocalStorage("savedDeck", "");
  const [deck, setDeck] = useState<boolean>(false);
  const [remainingCardsInDeck, setRemainingCardsInDeck] = useState<number>(0);
  const [playerOne, playerOneDispatch] = useReducer(playerReducer, PlayerOne());
  const [playerTwo, playerTwoDispatch] = useReducer(playerReducer, PlayerTwo());

  const getCardCodes = (cardsData: PlayingCards[]) => {
    const cards = cardsData.map((card) => card.code);
    const cardCodes = cards.join(",");
    return cardCodes;
  };

  const dealCards = async (deck_id: string) => {
    const drawCount = "11";
    // deal cards out to players
    const drawData = await DrawCards(savedDeck, drawCount);

    setRemainingCardsInDeck(drawData.remaining);

    const dealerCards = drawData.cards.slice(6);
    const opponentCards = drawData.cards.slice(0, 6);
    // dealer gets 5 cards, opponent gets 6 cards
    await AddToPile(deck_id, playerOne.name, getCardCodes(dealerCards));
    await AddToPile(deck_id, playerTwo.name, getCardCodes(opponentCards));
    // set player hands
    const dealerHand = await GetPileCards(savedDeck, playerOne.name);
    const opponentHand = await GetPileCards(savedDeck, playerTwo.name);
    playerOneDispatch({ type: "INITIAL_HAND", cards: dealerHand });
    playerTwoDispatch({ type: "INITIAL_HAND", cards: opponentHand });
  };
  const testDeckIdIsValid = async () => {
    const data = await ReshuffleCards(savedDeck);
    return data.success;
  };

  const handleGameStart = async () => {
    // save the deck id from the response so we don't have
    // to wait for an update
    let deckId = null;
    //check if we need to create a new deck
    if (savedDeck === "") {
      const newDeck = await CreateNewDeck();
      setSavedDeck(newDeck.deck_id);
      deckId = newDeck.deck_id;
    } else {
      deckId = savedDeck;
      // check that deck id is still valid
      // card API removes deck ids after 2 weeks of inactivity
      if (!(await testDeckIdIsValid())) {
        const newDeck = await CreateNewDeck();
        setSavedDeck(newDeck.deck_id);
        deckId = newDeck.deck_id;
      }
      //DEBUG
      console.log(`Local Storage deck ID ${savedDeck}`);
    }

    setDeck(true);
    await dealCards(deckId);
    // the player opposite the dealer always plays first
  };

  const handlePlayCard = async (cardCode: string) => {
    console.log("Clicked card: ", cardCode);
  };

  const handlePlayerHandReset = async () => {
    const data = await ReshuffleCards(savedDeck);
    // set players hand back to [] after Reshuffling deck
    playerOneDispatch({ type: "RESET_HAND" });
    playerTwoDispatch({ type: "RESET_HAND" });
    setRemainingCardsInDeck(data.remaining);
  };

  return (
    <GameContext.Provider
      value={{
        savedDeck,
        deck,
        remainingCardsInDeck,
        playerOne,
        playerTwo,
        handleGameStart,
        handlePlayCard,
        handlePlayerHandReset,
        dealCards
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGames() {
  return useContext(GameContext);
}

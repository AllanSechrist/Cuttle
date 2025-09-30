import { CreateNewDeck, DrawCards } from "~/game_logic/cards/deck";
import { AddToPile, GetPileCards } from "~/game_logic/cards/pile";
import type { Pile, Deck } from "~/types";
import type { PlayingCards } from "~/types";
import Card from "~/components/Card";
import Button from "~/components/Button";
import { useState } from "react";
import { useLocalStorage } from "~/components/hooks/useLocalStorage";

const GamePage = () => {
  const [deckID, setDeckID] = useLocalStorage("deckID", "")
  const [deck, setDeck] = useState<Deck | null>(null);
  const [playerOneHand, setPlayerOneHand] = useState<PlayingCards[]>([]);
  const [playerTwoHand, setPlayerTwoHand] = useState<PlayingCards[]>([]);
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
      setHand: (newHand: PlayingCards[]) => setPlayerOneHand(newHand),
    },
    {
      player: "playerTwo",
      hand: playerTwoHand,
      score: 0,
      setHand: (newHand: PlayingCards[]) => setPlayerTwoHand(newHand),
    },
  ];

  // const testLocalStorage = async () => {
  //   if (deckID === "") {
  //     const data = await CreateNewDeck();
  //     setDeck(data)
  //     setDeckID(data.deck_id)
  //     console.log(`Saved New Deck ID ${deckID}`)
  //   } else {
  //     console.log(`Deck ID from prev session ${deckID}`)
  //   }
  // }

  const handleGameStart = async () => {
    const playerOne = playerList[0].player
    const playerTwo = playerList[1].player
    // create a shuffled new deck
    const data = await CreateNewDeck();
    setDeck(data);
    const drawCount = "11";
    // deal cards out to players
    const cardsData = await DrawCards(data.deck_id, drawCount);
    const dealer = (cardsData).slice(6);
    const opponent = (cardsData).slice(0, 6);
    // dealer gets 5 cards, opponent gets 6 cards
    await AddToPile(data.deck_id, playerOne, dealer);
    await AddToPile(data.deck_id, playerTwo, opponent);
    // set player hands
    const dealerHand = await GetPileCards(data.deck_id, playerOne)
    const opponentHand = await GetPileCards(data.deck_id, playerTwo)
    setPlayerOneHand(dealerHand)
    setPlayerTwoHand(opponentHand)



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
              playerOneHand.map((card) => (
                <Card key={card.code} card={card} />
              ))
            ) : (
              <p>Hand is empty</p>
            )}
          </div>
          <div className="flex items-center justify-center">
            {playerTwoHand.length > 0 ? (
              playerTwoHand.map((card) => (
                <Card key={card.code} card={card} />
              ))
            ) : (
              <p>Hand is empty</p>
            )}
          </div>
        </div>
      )}
      {/* <Button handleClick={testLocalStorage} buttonType="draw">Save Test</Button> */}
    </div>
  );
};

export default GamePage;

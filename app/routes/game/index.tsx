import { NewDeck } from "~/game_logic/deck";
import type { Route } from "./+types";
import type { Deck } from "~/types";
import Card from "~/components/Card";
import { useState } from "react";

const GamePage = () => {
  const [deck, setDeck] = useState<Deck | null>(null);

  const handleNewDeck = async () => {
    const data = await NewDeck();
    setDeck(data);
  }

  return ( <>
    Game
  </> );
}

export default GamePage;

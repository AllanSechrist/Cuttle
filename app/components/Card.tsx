import type { PlayingCards } from "~/types";
const Card = ({ card }: { card: PlayingCards }) => {
  return (
    <div>
      <div className="w-24 h-36">
        <img src={card.image} alt={`${card.value} of ${card.suit}`} />
      </div>
    </div>
  );
};

export default Card;

import type { PlayingCard } from "~/types";
const Card = ({ card }: { card: PlayingCard }) => {
  return (
    <div>
      <div className="w-24 h-36">
        <img src={card.image} alt={`${card.value} of ${card.suit}`} />
      </div>
    </div>
  );
};

export default Card;

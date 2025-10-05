import type { PlayingCards } from "~/types";

type CardProps = {
  card: PlayingCards,
  onCardClick?: (code: string) => void;
}
const Card = ({ card, onCardClick }: CardProps) => {
  return (
    <div>
      <div className="w-24 h-36" onClick={() => onCardClick?.(card.code)}>
        <img src={card.image} alt={`${card.value} of ${card.suit}`} />
      </div>
    </div>
  );
};

export default Card;

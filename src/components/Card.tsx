import { Link } from "react-router-dom";

interface props {
  price: number;
  images: Array<string>;
  title: string;
  id: number | undefined;
  type?: string;
}
export default function Card({ price, images, title, id, type }: props) {
  const dividedPrice = String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  return (
    <Link
      to={`/shoes-app/catalog/${id}`}
      className={`${type === "sale-card" ? "top-sales-card" : "card"} `}
    >
      <img src={images[0]} className="card-image" alt={title} />
      <div className="card-info">
        <div className="hit-card-title">{title}</div>
        <div className="hit-card-price">{dividedPrice} руб.</div>
        <div className="order-btn btn-template">Заказать</div>
      </div>
    </Link>
  );
}

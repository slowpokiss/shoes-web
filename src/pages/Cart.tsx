import "./../../css/Cart.css";
import { Link } from "react-router-dom";
import { deleteItem, initialCartSliceInterface } from "../redux-toolkit/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import OrderForm from "../components/OrderForm";
import { useNavigation } from "react-router-dom";
import { Table } from "antd";

interface cartItem {
  name: string;
  size: number;
  count: number;
  price: number;
  id: number;
}

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: {cartSlice: initialCartSliceInterface}) => state.cartSlice.cart);
  const nav = useNavigation();

  function ActualCart({ cart, dispatch }: { cart: cartItem[]; dispatch: any }) {
    const data = cart.map((el: cartItem, ind: number) => ({
      key: el.id,
      id: el.id,
      index: ind + 1,
      name: el.name,
      size: el.size,
      count: el.count,
      price: el.price,
      totalPrice: Number(el.price) * el.count,
    }));
  
    const overallTotal = data.reduce((acc, item) => acc + item.totalPrice, 0);
    const formattedTotal = String(overallTotal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  
    const columns = [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
      },
      {
        title: "Название",
        dataIndex: "name",
        key: "name",
        render: (text: string, record: cartItem) => (
          <Link to={`/catalog/${record.id}`}>{text}</Link>
        ),  
      },
      {
        title: "Размер",
        dataIndex: "size",
        key: "size",
      },
      {
        title: "Кол-во",
        dataIndex: "count",
        key: "count",
      },
      // {
      //   title: "Стоимость",
      //   dataIndex: "price",
      //   key: "price",
      //   render: (text: string) =>
      //     `${String(text).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")} руб.`,
      // },
      {
        title: "Итого",
        dataIndex: "totalPrice",
        key: "totalPrice",
        render: (text: number) =>
          `${String(text).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")} руб.`,
      },
      {
        title: "Действия",
        key: "actions",
        render: (_: any, record: cartItem) => (
          <button
            onClick={() => dispatch(deleteItem({ id: record.id }))}
            className="btn-template btn-template-red"
          >
            Удалить
          </button>
        ),
      },
    ];
  
    return cart.length > 0 ? (
      <div>
        <Table size="small" columns={columns} dataSource={data} pagination={false} />
        <div className="total">
          <p>Общая стоимость: <strong>{formattedTotal} руб.</strong></p>
        </div>
      </div>
    ) : (
      <p className="text-center">Корзина пуста</p>
    );
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="cart">
          <section>
            <h2 className="text-center">Корзина</h2>
            <ActualCart cart={cart} dispatch={dispatch} />
          </section>
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="order-body">
              <OrderForm submitting={nav.state === "submitting"} />
            </div>
          </section>
          </div>
        </div>
      </div>
    </main>
  );
}

import { Await, useLoaderData, useAsyncValue } from "react-router-dom";
import { FormEvent, Suspense } from "react";
import Loader from "../components/Loader";
import {
  singleCardInterface,
  loaderDataInterface,
} from "../interface/interface";
import "../../css/SingleCard.css";
import { useState } from "react";
import { addToCart } from "../redux-toolkit/cartSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import type { CollapseProps } from "antd";
import { Collapse, Table } from "antd";

interface DataType {
  key: string;
  property: string;
  value: string | number | undefined;
}

async function getSingleCard(id: number) {
  try {
    const response = await fetch(
      `https://shoes-back-mber.onrender.com/api/products/${id}`
    );

    if (!response.ok) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Не удалось загрузить карточку товара",
      });
      return;
    }

    return response.json();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Не удалось загрузить карточку товара",
    });
    throw new Error(`Ошибка ${error}`);
  }
}

export const oneCardLoader = async ({ params }: any) => {
  const id = params.id;
  const oneCard = await getSingleCard(id);
  return { oneCard };
};

const OneCardConstructor = () => {
  const dispatch = useDispatch();
  const oneCard = useAsyncValue() as singleCardInterface;

  const filteredSizes = oneCard.sizes
    .filter((item) => item.available)
    .map((size) => size.size);

  const [size, setSize] = useState("");
  const [count, setCount] = useState(1);

  const onAddToCart = (ev: FormEvent) => {
    ev.preventDefault();
    const price = oneCard.price;
    const name = oneCard.title;
    const id = oneCard.id;
    dispatch(addToCart({ name, price, count, size, id }));
  };

  const columns = [
    {
      dataIndex: "property",
      key: "property",
    },
    {
      dataIndex: "value",
      key: "value",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      property: "Артикул",
      value: oneCard.sku,
    },
    {
      key: "2",
      property: "Производитель",
      value: oneCard.manufacturer,
    },
    {
      key: "3",
      property: "Цвет",
      value: oneCard.color,
    },
    {
      key: "4",
      property: "Материалы",
      value: oneCard.material,
    },
    {
      key: "5",
      property: "Сезон",
      value: oneCard.season,
    },
    {
      key: "6",
      property: "Повод",
      value: oneCard.reason,
    },
  ];

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Описание",
      children: (
        <Table
          className="table"
          columns={columns}
          showHeader={false}
          dataSource={data}
          pagination={false}
        />
      ),
    },
  ];

  return (
    <>
      <div className="single-card" key={oneCard.id}>
        <h1 className="single-card-title">{oneCard.title}</h1>
        <div className="single-card-main">
          <div className="single-card-img-container">
            <img
              className="single-card-img"
              src={oneCard.images[0]}
              alt={oneCard.title}
            />
          </div>

          <div className="single-card-info">
            <div className="single-card-info-wrapper">
              <Table
                columns={columns}
                showHeader={false}
                dataSource={data}
                pagination={false}
              />
            </div>

            <form
              className="add-to-cart-form"
              style={{ width: "100%" }}
              onSubmit={onAddToCart}
            >
              <div className="single-card-sizes">
                Размеры в наличии:
                {filteredSizes.map((el: string) => {
                  return (
                    <label
                      className={el === size ? "size current-size" : "size"}
                      key={oneCard.id}
                    >
                      <input
                        type="checkbox"
                        className={"cart-checkbox"}
                        key={oneCard.id}
                        onClick={() => setSize(el === size ? "" : el)}
                        required
                      />
                      <span className="checkbox-custom"></span>
                      {el}
                    </label>
                  );
                })}
              </div>
              <div className="single-card-counter">
                Количество:
                {
                  <div className="counter">
                    <div
                      className="counter-operation counter-subtract"
                      onClick={() => setCount(count - (count === 1 ? 0 : 1))}
                    >
                      -
                    </div>
                    <div className="counter-number">{count}</div>
                    <div
                      className="counter-operation counter-add"
                      onClick={() => setCount(count + 1)}
                    >
                      +
                    </div>
                  </div>
                }
              </div>
              <input
                type="submit"
                className="add-to-cart"
                value={"В корзину"}
              />
            </form>

            <div className="single-card-info-mobile">
            <Collapse accordion items={items} />
          </div>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default function SingleCard() {
  const loaderData = useLoaderData();
  const { oneCard } = loaderData as loaderDataInterface;

  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <section className="catalog">
              <Suspense fallback={<Loader />}>
                <Await resolve={oneCard}>
                  <OneCardConstructor />
                </Await>
              </Suspense>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

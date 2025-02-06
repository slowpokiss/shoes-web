import "../../css/MainPage.css";
import { useLoaderData, Await, useAsyncValue } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { cardInterface, loaderDataInterface } from "../interface/interface";
import {
  getCategoryItems,
  CategoryConstructor,
} from "../loaders/categoryLoader";
import { ItemsConstructor, getItems } from "../loaders/itemsLoader";
import LoadMore from "../components/LoadMore";
import Swal from "sweetalert2";
import { initialMainSliceInterface } from "../redux-toolkit/mainSlice";
import { Carousel } from "antd";

async function getTopSales() {
  try {
    const response = await fetch(
      "https://shoes-back-mber.onrender.com/api/top-sales"
    );
    if (!response.ok) {
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: "Не удалось загрузить хиты продаж",
      });
      return null
    }
    return response.json();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Ошибка!",
      text: "Не удалось загрузить хиты продаж",
    });
    return null
  }
}

const contentStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  textAlign: "center",
};

const SalesConstructor = () => {
  const topSales = useAsyncValue() as cardInterface[];

  return (
    <>
      <div className="top-sales-cards">
        {
          topSales !== null ? <Carousel arrows autoplay  autoplaySpeed={6000} infinite={true}  >
          {topSales.map((el: cardInterface, ind: number) => {
            return (
              <div className="top-sales-card-container" key={ind}>
                <div style={contentStyle}>
                  <div className=""></div>
                  <Card
                    key={el.id}
                    id={el.id}
                    images={el.images}
                    title={el.title}
                    price={el.price}
                    type={'sale-card'}
                  />
                </div>
              </div>
            );
          })}
        </Carousel> : <></>
        }
      </div>
    </>
  );
};

export const postLoader = async () => {
  const sales = getTopSales();
  const catalog = getItems(10);
  const category = getCategoryItems();
  return { sales, catalog, category };
};

export default function MainPage() {
  const loaderData = useLoaderData();
  const { sales, catalog, category } = loaderData as loaderDataInterface;

  const currCategory = useSelector(
    (state: { main: initialMainSliceInterface }) => state.main.currCategory
  );

  

  return (
    <>
      <main className="container">
        <div className="banner">
          <img
            src="../shoes-app/img/banner.jpg"
            className="img-fluid"
            alt="К весне готовы!"
          />
          <h2 className="banner-header">К весне готовы!</h2>
        </div>
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          <Suspense fallback={<Loader />}>
            <Await resolve={sales}>
              <SalesConstructor />
            </Await>
          </Suspense>
        </section>
        <section className="catalog">
          <h2 className="text-center">Каталог</h2>
          <div className="catalog-params">
            <Suspense fallback={<Loader />}>
              <Await resolve={category}>
                <CategoryConstructor />
              </Await>
            </Suspense>
          </div>
          <Suspense fallback={<Loader />}>
            <Await resolve={catalog}>
              <ItemsConstructor path={currCategory} />
            </Await>
          </Suspense>
          <LoadMore currCategory={currCategory} />
        </section>
      </main>
    </>
  );
}

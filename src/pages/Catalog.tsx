import { useLoaderData, Await } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense, useRef } from "react";
import Loader from "../components/Loader";
import { CategoryConstructor } from "../loaders/categoryLoader";
import { ItemsConstructor } from "../loaders/itemsLoader";
import {
  initialMainSliceInterface
} from "../redux-toolkit/mainSlice";
import LoadMore from "../components/LoadMore";
import { loaderDataInterface } from "../interface/interface";
import "../../css/MainPage.css";
import SearchForm from "../components/SearchForm";

export default function Catalog() {
  const loaderData = useLoaderData()
  const { catalog, category } = loaderData as loaderDataInterface;

  const currCategory = useSelector(
    (state: { main: initialMainSliceInterface }) => state.main.currCategory
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  if (inputRef.current && typeof currCategory.id === "string") {
    inputRef.current.value = String(currCategory.id);
  }


  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            {/* <div className="banner">
              <img
                src="../shoes-app/img/banner.jpg"
                className="img-fluid"
                alt="К весне готовы!"
              />
              <h2 className="banner-header">К весне готовы!</h2>
            </div> */}
            <section className="catalog">
              <h2 className="text-center">Каталог</h2>
              <div className="search-field">
                <SearchForm mobile={true} />
              </div>
              
              <ul className="catalog-categories nav justify-content-center">
                <Suspense fallback={<Loader />}>
                  <Await resolve={category}>
                    <CategoryConstructor />
                  </Await>
                </Suspense>
              </ul>
              <div className="row">
                <Suspense fallback={<Loader />}>
                  <Await resolve={catalog}>
                    <ItemsConstructor path={currCategory} />
                  </Await>
                </Suspense>
                <LoadMore currCategory={currCategory} />
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

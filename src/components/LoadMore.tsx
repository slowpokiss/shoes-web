import Loader from "./Loader";
import { useEffect, useState } from "react";
import Card from "./Card";
import { cardInterface } from "../interface/interface";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  setOffset,
  updateCurrOffset,
  updateCurrItems,
  clearCurrItems,
  initialMainSliceInterface
} from "../redux-toolkit/mainSlice";

interface props {
  currCategory: {
    offset: number;
    id: number | string;
  };
}

export default function LoadMore({ currCategory }: props) {
  const dispatch = useDispatch();
  const [loadState, setLoadState] = useState(false);


  const currOffset = useSelector(
    (state: {main: initialMainSliceInterface}) => state.main.currCategory.currOffset
  );
  const currItems = useSelector(
    (state: {main: initialMainSliceInterface}) => state.main.currCategory.currItems
  );

  const loadMore = async () => {
    setLoadState(true);
    try {
      let path = `https://shoes-back-mber.onrender.com/api/products?offset=${currCategory.offset}`;
      if (currCategory.id !== 10) {
        path = `https://shoes-back-mber.onrender.com/api/products?categoryId=${currCategory.id}&offset=${currCategory.offset}`;
      }
      if (typeof currCategory.id === "string") {
        path = `https://shoes-back-mber.onrender.com/api/products?q=${currCategory.id}&offset=${currCategory.offset}`;
      }

      const response = await fetch(path);
      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Ошибка!",
          text: "Не удалось загрузить больше товаров",
        });
        setLoadState(false);
        return;
      }

      const newItems = await response.json();

      const offset = newItems.length;


      if (newItems.length < 6) {
        setLoadState(false);
        dispatch(updateCurrOffset({ offset }));
        return;
      }

      

      const settingOffset = newItems.length + currCategory.offset;
      dispatch(setOffset({ settingOffset }));
      dispatch(updateCurrItems({ newItems }));
      setLoadState(false);
    } catch (error) {
      console.error("Error fetching more items:", error);
      setLoadState(false);
    }
  };

  useEffect(() => {
    dispatch(clearCurrItems());
  }, [currCategory.id]);

  return (
    <>
      {currItems ? (
        <div className="catalog-items">
          {currItems.map((el: cardInterface) => {
            return (
              <Card
                key={el.id}
                id={el.id}
                images={el.images}
                title={el.title}
                price={el.price}
              />
            );
          })}
        </div>
      ) : null}
      {loadState ? <Loader /> : null}
      <button
        onClick={loadMore}
        disabled={loadState}
        className={`btn-loadMore btn-template ${
          currCategory.offset % 6 > 0 || currOffset < 6 ? "btn-hide" : ""
        }`}
      >
        Загрузить ещё
      </button>
    </>
  );
}

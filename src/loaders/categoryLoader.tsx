import { useDispatch, useSelector } from "react-redux";
import { useAsyncValue, Link } from "react-router-dom";
import { categoryInterface } from "../interface/interface";
import {
  initialMainSliceInterface,
  setCategory,
} from "../redux-toolkit/mainSlice";
import Swal from "sweetalert2";
import { ConfigProvider, Dropdown} from "antd";
import type { MenuProps } from "antd";
import { MenuOutlined } from '@ant-design/icons';
import '../../css/Catalog.css'

export const mainLinks: MenuProps["items"] = [
  { 
    key: "/shoes-app", 
    label: <Link to="/shoes-app">Главная</Link> 
  },
  {
    key: "/shoes-app/catalog",
    label: <Link to="/shoes-app/catalog">Каталог</Link>,
  },
  {
    key: "/shoes-app/about",
    label: <Link to="/shoes-app/about">О магазине</Link>,
  },
  {
    key: "/shoes-app/contacts",
    label: <Link to="/shoes-app/contacts">Контакты</Link>,
  },
];

export const categoryItemsLinks: MenuProps["items"] = [
  { key: "10", label: <Link to="/shoes-app/catalog">Все</Link> },
  { key: "12", label: <Link to="/shoes-app/catalog">Мужская обувь</Link> },
  { key: "13", label: <Link to="/shoes-app/catalog">Женская обувь</Link> },
  { key: "14", label: <Link to="/shoes-app/catalog">Обувь унисекс</Link> },
  { key: "15", label: <Link to="/shoes-app/catalog">Детская обувь</Link> },
];

export async function getCategoryItems() {
  try {
    const response = await fetch(
      "https://shoes-back-mber.onrender.com/api/categories"
    );
    if (!response.ok) {
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: "Не удалось категории товаров",
      });
      return []
    }
    return response.json();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Не удалось загрузить категории товаров",
    });
  }
}

export const CategoryConstructor = () => {
  const dispatch = useDispatch();
  const currCategoryId = useSelector(
    (state: { main: initialMainSliceInterface }) => state.main.currCategory.id
  );
  const categoryItems = useAsyncValue() as categoryInterface[];

  const setCategoryCB = (settingCategory: number) => {
    dispatch(setCategory({ settingCategory }));
  };

  return (
    <>
      <ul className="catalog-params-list">
        <li
          className={
            currCategoryId === 10
              ? "catalog-param catalog-param-active"
              : "catalog-param"
          }
          onClick={() => {
            setCategoryCB(10);
          }}
        >
          Все
        </li>
        {categoryItems.map((el: categoryInterface) => {
          return (
            <li
              className={
                currCategoryId === el.id
                  ? "catalog-param catalog-param-active"
                  : "catalog-param"
              }
              onClick={() => {
                setCategoryCB(el.id);
              }}
              key={el.id}
            >
              {el.title}
            </li>
          );
        })}
      </ul>
      <div className="catalog-params-list-mobile">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ff65a5",
            fontSize: 20,
            colorBgContainer: "transparent",
            borderRadius: 8,
          },
        }}
      >
        <Dropdown
          menu={{
            items: categoryItemsLinks,
            selectable: true,
            defaultSelectedKeys: ["1"],
            onClick:(ev: any) => setCategoryCB(Number(ev.key))
          }}
          trigger={["click"]}
          className="category-dropdown"
        >
          <div className="category-icons">
            Категории
            <MenuOutlined />
          </div>
        </Dropdown>
      </ConfigProvider>
      </div>
    </>
  );
};

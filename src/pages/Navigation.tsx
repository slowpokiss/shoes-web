import { Link, NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "../components/SearchForm";
import { setSearchState } from "../redux-toolkit/mainSlice";
import { Dropdown, Typography, Space, ConfigProvider } from "antd";
import DrawerComponent from "../components/DrawerComponent";
import { mainLinks } from "../loaders/categoryLoader";
import { initialCartSliceInterface } from "../redux-toolkit/cartSlice";

const scrollTop = () =>
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

export default function Navigation() {
  const dispatch = useDispatch();
  const cartCount = useSelector(
    (state: { cartSlice: initialCartSliceInterface }) =>
      state.cartSlice.cartCount
  );

  return (
    <>
      <header className="container">
        <nav className="navbar">
          <div className="logo">
            <Link to="/shoes-app/" className="navbar-brand">
              <img src="/shoes-app/img/header-logo.png" alt="Bosa Noga" />
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/shoes-app/" end>
                  Главная
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/shoes-app/catalog">
                  Каталог
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/shoes-app/about">
                  О магазине
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/shoes-app/contacts">
                  Контакты
                </NavLink>
              </li>
            </ul>

            <div className="navbar-mobile">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#ff65a5",
                    fontSize: 22,
                    colorBgContainer: "transparent",
                    borderRadius: 8,
                  },
                }}
              >
                <Dropdown
                  menu={{
                    items: mainLinks,
                    selectable: true,
                    defaultSelectedKeys: ["1"],
                  }}
                  trigger={["click"]}
                  className="dropdown-container"
                >
                  <Typography.Link>
                    <Space>
                      <div className="mobile-burger">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </Space>
                  </Typography.Link>
                </Dropdown>
              </ConfigProvider>

              <DrawerComponent />
            </div>

            <div>
              <div className="header-controls-pics">
                <img
                  onClick={() => {
                    dispatch(setSearchState());
                  }}
                  className="header-controls-pic header-controls-search"
                  src="/shoes-app/img/search.png"
                  alt="search"
                />
                <Link
                  to={"/shoes-app/cart"}
                  className="header-controls-pic header-controls-cart"
                >
                  <div
                    className={`header-controls-cart-full ${
                      cartCount >= 0 ? "" : "btn-hide"
                    }`}
                  >
                    {cartCount ? cartCount : 0}
                  </div>

                  <img
                    className="header-controls-pic header-controls-cart"
                    src="/shoes-app/img/shopping-cart.png"
                    alt="cart"
                  />

                  <div className="header-controls-cart-menu "></div>
                </Link>
              </div>
              <SearchForm />
            </div>
          </div>
        </nav>
        <div className="banner">
          <img
            src="/shoes-app/img/banner.jpg"
            className="img-fluid"
            alt="К весне готовы!"
          />
          <h2 className="banner-header">К весне готовы!</h2>
        </div>
      </header>

      <Outlet />

      <footer className="container bg-light footer">
        <div className="footer-container">
          <div className="footer-container-item footer-info">
            <section>
              <p className="footer-item-title">Информация</p>
              <ul className="nav">
                <Link
                  to="shoes-app/about"
                  onClick={scrollTop}
                  className="nav-item"
                >
                  О магазине
                </Link>
                <Link
                  to="shoes-app/catalog"
                  onClick={scrollTop}
                  className="nav-item"
                >
                  Каталог
                </Link>
                <Link
                  to="shoes-app/contacts"
                  onClick={scrollTop}
                  className="nav-item"
                >
                  Контакты
                </Link>
              </ul>
            </section>
          </div>
          <div className="footer-container-item footer-payment">
            <section>
              <p className="footer-item-title">Принимаем к оплате:</p>
              <div className="footer-pay">
                <img
                  src="/shoes-app/img/paypal.png"
                  alt="paypal"
                  className="footer-pay-system"
                />
                <img
                  src="/shoes-app/img/visa.png"
                  alt="visa"
                  className="footer-pay-system"
                />
                <img
                  src="/shoes-app/img/card.png"
                  alt="paypal"
                  className="footer-pay-system"
                />
                <img
                  src="/shoes-app/img/yamoney.png"
                  alt="yamoney"
                  className="footer-pay-system"
                />
              </div>
            </section>
            <section>
              <div className="footer-copyright">
                2009-2025 © BosaNoga.ru — модный интернет-магазин обуви и
                аксессуаров.
                <br />
                Все права защищены.Доставка по всей России!
              </div>
            </section>
          </div>
          <div className="footer-container-item footer-contacts">
            <section>
              <p className="footer-item-title">Контакты:</p>
              <a className="footer-contacts-phone" href="tel:+7-495-790-35-03">
                +7 495 79 03 5 03
              </a>
              <span className="footer-contacts-working-hours">
                Ежедневно: с 09-00 до 21-00
              </span>
              <a
                className="footer-contacts-email"
                href="mailto:office@bosanoga.ru"
              >
                office@bosanoga.ru
              </a>
              <div className="footer-social-links">
                <img
                  className="footer-social-link"
                  src="/shoes-app/img/vk-social-network-logo.png"
                  alt="vk"
                />
                <img
                  className="footer-social-link"
                  src="/shoes-app/img/whatsapp.png"
                  alt="whatsapp"
                />
                <img
                  className="footer-social-link"
                  src="/shoes-app/img/telegram.png"
                  alt="telegram"
                />
              </div>
            </section>
          </div>
        </div>
      </footer>
    </>
  );
}

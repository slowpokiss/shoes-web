import { useState } from "react";
import { Drawer, Menu, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
import "./../../css/DrawerComponent.css";
import SearchForm from "./SearchForm";
import type { MenuProps } from "antd";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux-toolkit/mainSlice";

type MenuItem = Required<MenuProps>["items"][number];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

interface catalogLevelsProps {
  closeDraweCB: () => void;
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const items: MenuItem[] = [
  { key: "/shoes-app", label: <Link to="/shoes-app">Главная</Link> },
  {
    key: "/shoes-app/catalog",
    label: "Каталог",
    children: [
      { key: "10", label: <Link to="/shoes-app/catalog">Все</Link> },
      { key: "12", label: <Link to="/shoes-app/catalog">Мужская обувь</Link> },
      { key: "13", label: <Link to="/shoes-app/catalog">Женская обувь</Link> },
      { key: "14", label: <Link to="/shoes-app/catalog">Обувь унисекс</Link> },
      { key: "15", label: <Link to="/shoes-app/catalog">Детская обувь</Link> },
    ],
  },
  {
    key: "/shoes-app/about",
    label: <Link to="/shoes-app/about">О магазине</Link>,
  },
];

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

function CatalogLevels({ closeDraweCB }: catalogLevelsProps) {
  const [stateOpenKeys, setStateOpenKeys] = useState(["1"]);
  const dispatch = useDispatch()

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey !== undefined) {
      setStateOpenKeys(
        openKeys.filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };


  const onLinkClick = (ev: any) => {
    if (parseInt(ev.key)){
      const settingCategory = Number(ev.key)
      dispatch(setCategory({ settingCategory }));
    }

    closeDraweCB();
  };

  return (
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
      <Menu
        mode="inline"
        //defaultSelectedKeys={["11"]}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        onClick={onLinkClick}
        style={{ width: "100%" }}
        items={items}
      />
    </ConfigProvider>
  );
}

export default function DrawerComponent() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="mobile-drawer">
        <div className="mobile-burger" onClick={showDrawer}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Drawer
          placement="left"
          closable={false}
          onClose={onClose}
          size={"default"}
          open={open}
          key="left"
        >
          <div className="drawer-content">
            <div className="drawer-main">
              <div className="drawer-close" onClick={onClose}></div>
              <div className="drawer-content-top">
                <div>
                  <Link onClick={onClose} to="/shoes-app" className="navbar-brand">
                    <img
                      src="../../shoes-app/img/header-logo.png"
                      alt="Bosa Noga"
                    />
                  </Link>
                </div>
                <SearchForm mobile={true} />
              </div>

              <div className="drawer-content-navigation">
                <CatalogLevels closeDraweCB={onClose} />
              </div>
            </div>

            <div className="drawer-bottom">
              <div className="">
                <p className="footer-item-title">Контакты:</p>
                <a
                  className="footer-contacts-phone"
                  href="tel:+7-495-790-35-03"
                >
                  +7 495 79 03 5 03
                </a>
              </div>

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
                  src="../../shoes-app/img/vk-social-network-logo.png"
                  alt="vk"
                />
                <img
                  className="footer-social-link"
                  src="../../shoes-app/img/whatsapp.png"
                  alt="whatsapp"
                />
                <img
                  className="footer-social-link"
                  src="../../shoes-app/img/telegram.png"
                  alt="telegram"
                />
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
}

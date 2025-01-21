import { useEffect, useState } from "react";
import "./../../css/Popup.css";

interface props {
  formStatus: boolean | Object | unknown | string;
}

export default function CartPopup({ formStatus }: props) {
  const [popupState, setPopupState] = useState(true);

  useEffect(() => {
    if (formStatus !== undefined) {
      setPopupState(false);
    } else {
      setPopupState(true);
    }
  }, [formStatus]);

  return (
    <>
      <div className={`popup ${popupState ? "close" : ""}`}>
        <div className="popup__body">
          <div className="popup__text">
            <span>
              {formStatus === true
                ? "Заказ успешно оформлен"
                : "Что-то пошло не так..."}
            </span>
          </div>
          <span
            className="popup__btn"
            onClick={() => {
              setPopupState(true);
            }}
          >
            &#10006;
          </span>
        </div>
      </div>
    </>
  );
}

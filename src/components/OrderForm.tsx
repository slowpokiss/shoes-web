import { Form, useActionData } from "react-router-dom";
import { useDispatch } from "react-redux";
import CartPopup from "./CartPopup";
import Loader from "./Loader";
import { clearCart } from "../redux-toolkit/cartSlice";
import { useEffect, useRef } from "react";

interface props {
  submitting: boolean;
}

export default function OrderForm({ submitting }: props) {
  const act = useActionData();
  const dispatch = useDispatch();

  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const agreementRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (act) {
      dispatch(clearCart());
    }
    phoneRef.current!.value = "";
    addressRef.current!.value = "";
    agreementRef.current!.checked = false;
  }, [act]);

  return (
    <>
      {submitting ? <Loader /> : null}
      <CartPopup formStatus={act} />
      <Form action="/shoes-app/cart" method="POST" className="order-form">
        <div className="form-group">
          <label htmlFor="phone">Телефон</label>
          <input
            className="form-input form-control"
            id="phone"
            name="phone"
            placeholder="Ваш телефон"
            required
            ref={phoneRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Адрес доставки</label>
          <input
            className="form-input form-control"
            id="address"
            placeholder="Адрес доставки"
            name="address"
            required
            ref={addressRef}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="agreement"
            required
            ref={agreementRef}
          />
          <label className="form-check-label" htmlFor="agreement">
            Согласен с правилами доставки
          </label>
        </div>
        <input
          className="btn-template"
          type="submit"
          value={"Оформить"}
          id=""
        />
      </Form>
    </>
  );
}

const apiOrder = async (data: any) => {
  try {
    await fetch("https://shoes-app-back.onrender.com/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw new Error(`Ошибка ${error}`)
  }
};

export const getFormData = async ({ request }: any) => {
  const cart = localStorage.getItem("cart");
  const parsedCart = cart ? JSON.parse(cart) : null; 

  if (!parsedCart) {
    return null; 
  }

  const formData = await request.formData();
  const data = {
    owner: {
      phone: formData.get("phone"),
      address: formData.get("address"),
    },
    items: parsedCart
  };

  await apiOrder(data);
  return true;
};

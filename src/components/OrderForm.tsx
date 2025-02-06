import { Form, useActionData, LoaderFunctionArgs } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import {
  clearCart
} from "../redux-toolkit/cartSlice";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  orderDataInterface
} from "../interface/interface";
import { Alert } from 'antd';

interface orderFormProps {
  submitting: boolean;
}

export default function OrderForm({ submitting }: orderFormProps) {
  const act = useActionData();
  const dispatch = useDispatch();
  const [alertState, setAlertState] = useState(false);
  
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const agreementRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (act) {
      dispatch(clearCart());
      console.log(act)
      setAlertState(true)
    }

    phoneRef.current!.value = "";
    addressRef.current!.value = "";
    agreementRef.current!.checked = false;
  }, [act]);

  return (
    <>
      {submitting ? <Loader /> : null}
      {/* <Alert className={`${alertState ? 'block': 'none'}`} closable message="Заказ успешно сделан!" type="success" showIcon /> */}
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

const apiOrder = async (data: orderDataInterface): Promise<void> => {
  try {
    const response = await fetch(
      "https://shoes-back-mber.onrender.com/api/order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: "Не удалось совершить заказ",
      });
    }

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Ошибка!",
      text: "Не удалось совершить заказ",
    });
    throw new Error(`Ошибка ${error}`);
  }
};


export const getFormData = async ({ request }: LoaderFunctionArgs) => {
  const cart = localStorage.getItem("cart");
  const totalPrice = localStorage.getItem("totalPrice");
  const parsedCart = cart ? JSON.parse(cart) : null; 

  if (!parsedCart) {
    return null; 
  }

  const formData = await request.formData();

  const data = {
    owner: {
      phone: formData.get("phone") as string, 
      address: formData.get("address") as string, 
    },
    items: parsedCart,
    totalPrice: Number(totalPrice),
  };

  await apiOrder(data);

  return true;
};

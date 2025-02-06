import '../../css/Contacts.css'

export default function Contacts() {
  return (
    <>
      <main className="container">
        <div>
          <section className="contacts-container">
            <h2 className="text-center">Контакты</h2>
            <p>
              Наш головной офис расположен в г.Москва, по адресу: Варшавское
              шоссе, д. 17, бизнес-центр W Plaza.
            </p>
            <p>Координаты для связи:</p>
            <p>
              Телефон: <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>{" "}
              (ежедневно: с 09-00 до 21-00)
            </p>
            <p>
              Email:{" "}
              <a href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

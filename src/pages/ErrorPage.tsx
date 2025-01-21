export default function ErrorPage() {
  return (
    <>
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src="../img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <section className="top-sales">
            <h2 className="text-center">Извините, произошла ошибка</h2>
            <p>
              Что-то пошло не так
            </p>
          </section>
        </div>
      </div>
    </main>
    </>
  )
}
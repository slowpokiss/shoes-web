export default function ErrorPage() {
  return (
    <>
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src="./img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <section className="top-sales">
            <h2 className="text-center">Ошибка</h2>
            <p>
              Извините, произошла ошибка!
            </p>
          </section>
        </div>
      </div>
    </main>
    </>
  )
}
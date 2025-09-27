import "../../scss/styles/components/empty.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <div className="not-found__content">
          <h1 className="not-found__title">404</h1>
          <h2 className="not-found__subtitle">Página Não Encontrada</h2>
          <p className="not-found__description">
            A página que você está procurando não existe ou foi movida.
          </p>
          <div className="not-founb__box">
            <button
              className="not-found__box__button"
              onClick={() => location.href = "/signup"}
            >
              Cadastrar
            </button>
            <button
              className="not-found__box__button"
              onClick={() => location.href = "/login"}
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

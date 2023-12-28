import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Chun L. Repairs!</span>
        </h1>
      </header>
      <main className="public_main">
        <p>
          Located in the beautiful city of Lagos, Chun L. Repairs provides
          technical experts ready to all your tech repair requirements
        </p>
        <address className="public_addr">
          Chun L. Repairs <br />
          555 Anthony Drive <br />
          Victoria Island, LG 12345 <br />
          <a href="tel: +2345555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Chun Lee</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );

  return content;
};
export default Public;

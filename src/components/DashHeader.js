import { Link } from "react-router-dom";

const DashHeader = () => {
  const content = (
    <header className="dash-header">
      <div className="dash-header__container">
        <Link to="/dash">
          <h1 dash-header__title>techNotes</h1>
        </Link>
        <nav className="dash-header__nav">
          {/*We add navigation buttons later*/}
        </nav>
      </div>
    </header>
  );
  return content;
};
export default DashHeader;

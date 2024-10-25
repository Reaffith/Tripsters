import "./Footer.scss";
import logo from "../pics/logo.svg";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <div className="footer">
      <div className="footer__creators">
        <h3 className="footer__creators--header">Creators:</h3>

        <p className="footer__creators--item">
          <a
            href="https://github.com/Reaffith"
            target="_blank"
            className="footer__creators--item--link"
          >
            Taras Nechyporuck
          </a>{" "}
          - Front-end
        </p>

        <p className="footer__creators--item">
          <a
            href="https://github.com/qreqit"
            target="_blank"
            className="footer__creators--item--link"
          >
            Ivan Prystaia
          </a>{" "}
          - Back-end
        </p>

        <p className="footer__creators--item">
          <a href="" target="_blank" className="footer__creators--item--link">
            Sofyia Kozytska
          </a>{" "}
          - UX/UI
        </p>
      </div>

      <div className="footer__block">
        <img src={logo} alt="Tripsters" className="footer__block--logo" onClick={scrollToTop}/>

        <p className="footer__block--text">Tripsters 2024</p>
      </div>

      <p className="footer__contact">
        Contact us:<br></br> <a href="mailto:tripstersma@gmail.com">tripstersma@gmail.com</a>
      </p>
    </div>
  );
};

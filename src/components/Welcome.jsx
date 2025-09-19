import "./Welcome.css";
import logo from "../assets/images/logo_supercars.svg";
import cover from "../assets/images/cover.jpg";

const Welcome = ({ onCalculateClick }) => {
  return (
    <div className="welcome">
      <img src={cover} alt="arte de supercars" className="cover-image" />
      <div className="welcome-container">
        <div className="welcome-content">
          <h1 className="welcome-title">Bienvenidos</h1>

          <h2 className="welcome-subtitle">a la calculadora del ahorro de</h2>
          <img src={logo} alt="logo de supercars" className="logo" />

          <button className="calculate-button" onClick={onCalculateClick}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="calculator-icon"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8 7h8M8 11h8M8 15h8"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="12" cy="7" r="1" fill="currentColor" />
              <circle cx="12" cy="11" r="1" fill="currentColor" />
              <circle cx="12" cy="15" r="1" fill="currentColor" />
            </svg>
            Calcular
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

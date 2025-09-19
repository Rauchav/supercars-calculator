import { useState } from "react";
import "./Results.css";

const Results = ({ results, onCalculateAgain }) => {
  const [withSubsidy, setWithSubsidy] = useState(false);

  if (!results) return null;

  const currentGasCar = withSubsidy
    ? results.gasCarWithoutSubsidy
    : results.gasCarWithSubsidy;
  const currentMonthlySavings = withSubsidy
    ? results.monthlySavingsWithoutSubsidy
    : results.monthlySavingsWithSubsidy;
  const currentAnnualSavings = withSubsidy
    ? results.annualSavingsWithoutSubsidy
    : results.annualSavingsWithSubsidy;

  return (
    <div className={`results ${withSubsidy ? "toggle-active" : ""}`}>
      <div className="results-container">
        <div className="logo-container">
          <img
            src="https://www.supercars.com.bo/images/logo_supercars.svg"
            alt="Supercars Logo"
            className="logo"
          />
        </div>

        <div className="results-content">
          <h1 className="results-title">
            Descubre cuánto ahorrarás si cambias tu auto a gasolina por uno 100%
            eléctrico
          </h1>

          <div className="comparison-container">
            {/* Left Column - Gas Car */}
            <div className="comparison-column">
              <div className="car-info">
                <div className="car-icon">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 17H21L19 9H5L3 17Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="8"
                      cy="17"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="16"
                      cy="17"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M6 9L8 3H16L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h3 className="car-model">{currentGasCar.model}</h3>

                <div className="car-details">
                  <div className="detail-item">
                    <span className="detail-label">
                      Capacidad de tanque en litros:
                    </span>
                    <span className="detail-value">
                      {currentGasCar.capacidaddetanque} litros
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">
                      Costo de tanque lleno en Bs:
                    </span>
                    <span className="detail-value">
                      {currentGasCar.costodetanquelleno} Bs
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">
                      Días promedio de duración de un tanque lleno:
                    </span>
                    <span className="detail-value">
                      {currentGasCar.diasqueduraeltanque}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">
                      Cuántas tanques llenos necesitas al mes:
                    </span>
                    <span className="detail-value">
                      {currentGasCar.tanquesalmes}
                    </span>
                  </div>

                  <div className="detail-item highlight">
                    <span className="detail-label">
                      Costo mensual en gasolina en Bs:
                    </span>
                    <span className="detail-value highlight-value">
                      {currentGasCar.costocargamensual} Bs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Electric Car */}
            <div className="comparison-column">
              <div className="car-info">
                <div className="car-icon electric">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 17H21L19 9H5L3 17Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="8"
                      cy="17"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="16"
                      cy="17"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M6 9L8 3H16L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5L14 7L12 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h3 className="car-model">{results.electricCar.model}</h3>

                <div className="car-details">
                  <div className="detail-item">
                    <span className="detail-label">Autonomía:</span>
                    <span className="detail-value">
                      {results.electricCar.autonomia} km
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">
                      Capacidad de batería (kw/h):
                    </span>
                    <span className="detail-value">
                      {results.electricCar.capacidaddebateria}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">
                      Kilómetros recorridos por día:
                    </span>
                    <span className="detail-value">
                      {results.electricCar.kmpordia}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">
                      Duración de la carga en días:
                    </span>
                    <span className="detail-value">
                      {results.electricCar.diasdecarga} días
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">
                      Cargas necesarias por mes:
                    </span>
                    <span className="detail-value">
                      {results.electricCar.cargasmensulaes}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">
                      Costo de carga completa:
                    </span>
                    <span className="detail-value">
                      {results.electricCar.costocargacompletadia.toFixed(2)} Bs
                    </span>
                  </div>

                  <div className="detail-item highlight">
                    <span className="detail-label">
                      Costo total de cargas al mes:
                    </span>
                    <span className="detail-value highlight-value">
                      {results.electricCar.costocargamensual.toFixed(2)} Bs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subsidy Toggle */}
          <div className="subsidy-toggle-container">
            <label className="toggle-label">
              <span className="toggle-text">
                {withSubsidy ? "Sin subvención" : "Con subvención"}
              </span>
              <input
                type="checkbox"
                checked={withSubsidy}
                onChange={(e) => setWithSubsidy(e.target.checked)}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
              <span className="toggle-text">
                {withSubsidy ? "13 Bs" : "3,74 Bs"}
              </span>
            </label>
          </div>

          {/* Savings Display */}
          <div className="savings-container">
            <div className="savings-box monthly">
              <h3 className="savings-title">
                Ahorro mensual total si te cambias a un automóvil 100% eléctrico
              </h3>
              <div className="savings-amount">
                {currentMonthlySavings.toFixed(2)} Bs
              </div>
            </div>

            <div className="savings-box annual">
              <h3 className="savings-title">
                Ahorro anual total si te cambias a un automóvil 100% eléctrico
              </h3>
              <div className="savings-amount">
                {currentAnnualSavings.toFixed(2)} Bs
              </div>
            </div>
          </div>

          <button className="calculate-again-button" onClick={onCalculateAgain}>
            Calcular nuevamente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;

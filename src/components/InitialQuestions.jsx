import { useState } from "react";
import "./InitialQuestions.css";
import { cars } from "../data/cars.js";

const InitialQuestions = ({ onSubmit }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [kmPerDay, setKmPerDay] = useState("");

  const electricCars = [
    {
      id: "1",
      model: "EQ - ICAR - ICE CREAM",
    },
    {
      id: "2",
      model: "EQ7 - AIQAR",
    },
    {
      id: "3",
      model: "iCAR 03 - ICAR - iCAR 03 4WD",
    },
    {
      id: "4",
      model: "AYA - NETA - AYA",
    },
    {
      id: "5",
      model: "X - NETA - NETAX",
    },
  ];

  const handleCarSelect = (carModel) => {
    setSelectedCar(carModel);
  };

  const getCarImage = (carModel) => {
    const carData = cars.find((car) => car.name === carModel);
    return carData ? carData.image : null;
  };

  const handleKmChange = (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value);
    setKmPerDay(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCar && kmPerDay) {
      onSubmit(selectedCar, kmPerDay);
    }
  };

  const isFormValid = selectedCar && kmPerDay >= 5 && kmPerDay <= 65;
  const showKmError = kmPerDay !== "" && (kmPerDay < 5 || kmPerDay > 65);

  return (
    <div className="initial-questions">
      <div className="questions-container">
        <div className="logo-container">
          <img
            src="https://www.supercars.com.bo/images/logo_supercars.svg"
            alt="Supercars Logo"
            className="logo"
          />
        </div>

        <div className="questions-content">
          <h1 className="questions-title">Calculadora de Ahorro</h1>

          <form onSubmit={handleSubmit} className="questions-form">
            {/* Question 1 */}
            <div className="question-section">
              <h2 className="question-title">
                ¿Cuál es tu modelo de automóviles 100% eléctricos favorito?
              </h2>

              <div className="car-cards">
                {electricCars.map((car) => (
                  <button
                    key={car.id}
                    type="button"
                    className={`car-card ${
                      selectedCar === car.model ? "selected" : ""
                    }`}
                    onClick={() => handleCarSelect(car.model)}
                  >
                    <img
                      src={getCarImage(car.model)}
                      alt={car.model}
                      className="car-image"
                    />
                    <span className="car-name">{car.model}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div className="question-section">
              <h2 className="question-title">
                ¿Cuántos kilómetros por día sueles recorrer con tu vehículo a
                gasolina?
              </h2>

              <div className="km-input-container">
                <input
                  type="number"
                  min="5"
                  max="65"
                  value={kmPerDay}
                  onChange={handleKmChange}
                  placeholder="Ingresa un número entre 5 y 65"
                  className="km-input"
                />
                <span className="km-label">km/día</span>
                {showKmError && (
                  <div className="km-error">Ingresa un número entre 5 a 65</div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={`calculate-button ${
                isFormValid ? "valid" : "invalid"
              }`}
              disabled={!isFormValid}
            >
              Calcular Ahorro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InitialQuestions;

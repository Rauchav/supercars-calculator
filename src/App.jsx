import { useState } from "react";
import Welcome from "./components/Welcome";
import ParticipantModal from "./components/ParticipantModal";
import InitialQuestions from "./components/InitialQuestions";
import Results from "./components/Results";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [participantData, setParticipantData] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [kmPerDay, setKmPerDay] = useState(null);
  const [calculationResults, setCalculationResults] = useState(null);

  const handleCalculateClick = () => {
    setCurrentPage("participant-modal");
  };

  const handleParticipantSubmit = (data) => {
    setParticipantData(data);
    setCurrentPage("initial-questions");
  };

  const handleQuestionsSubmit = (carModel, km) => {
    setSelectedCar(carModel);
    setKmPerDay(km);
    calculateSavings(carModel, km);
    setCurrentPage("results");
  };

  const calculateSavings = (carModel, km) => {
    // Electric car data with base specifications
    const electricCarsBase = [
      {
        _id: "1",
        model: "AICAR EQ ICE CREAM",
        autonomia: 170,
        capacidaddebateria: 13.9,
      },
      {
        _id: "2",
        model: "AICAR EQ7",
        autonomia: 512,
        capacidaddebateria: 66,
      },
      {
        _id: "3",
        model: "AICAR ICAR 03",
        autonomia: 501,
        capacidaddebateria: 66,
      },
      {
        _id: "4",
        model: "NETA AYA",
        autonomia: 410,
        capacidaddebateria: 40.7,
      },
      {
        _id: "5",
        model: "NETA X",
        autonomia: 450,
        capacidaddebateria: 64.1,
      },
    ];

    // Find the selected car and calculate dynamic values
    const selectedCarBase = electricCarsBase.find(
      (car) => car.model === carModel
    );
    const diasdecarga = Math.round(selectedCarBase.autonomia / km);
    const cargasmensulaes = Math.round(km / diasdecarga);
    const costocargacompletadia = selectedCarBase.capacidaddebateria * 0.91;
    const costocargamensual = costocargacompletadia * cargasmensulaes;

    const selectedElectricCar = {
      ...selectedCarBase,
      kmpordia: km,
      diasdecarga: diasdecarga,
      cargasmensulaes: cargasmensulaes,
      costocargacompletadia: costocargacompletadia,
      costocargamensual: costocargamensual,
    };

    // Gas car data
    const gasCars = [
      {
        subencion: true,
        model: "Automóvil a gasolina",
        capacidaddetanque: 50,
        costodetanquelleno: 650,
        diasqueduraeltanque: 10,
        tanquesalmes: 3,
        costocargamensual: 561,
      },
      {
        subencion: false,
        model: "Automóvil a gasolina",
        capacidaddetanque: 50,
        costodetanquelleno: 650,
        diasqueduraeltanque: 10,
        tanquesalmes: 3,
        costocargamensual: 1950,
      },
    ];

    const gasCarWithSubsidy = gasCars.find((car) => car.subencion === true);
    const gasCarWithoutSubsidy = gasCars.find((car) => car.subencion === false);

    const monthlySavingsWithSubsidy =
      gasCarWithSubsidy.costocargamensual -
      selectedElectricCar.costocargamensual;
    const monthlySavingsWithoutSubsidy =
      gasCarWithoutSubsidy.costocargamensual -
      selectedElectricCar.costocargamensual;

    setCalculationResults({
      electricCar: selectedElectricCar,
      gasCarWithSubsidy,
      gasCarWithoutSubsidy,
      monthlySavingsWithSubsidy,
      monthlySavingsWithoutSubsidy,
      annualSavingsWithSubsidy: monthlySavingsWithSubsidy * 12,
      annualSavingsWithoutSubsidy: monthlySavingsWithoutSubsidy * 12,
    });
  };

  const handleCalculateAgain = () => {
    setCurrentPage("welcome");
    setParticipantData(null);
    setSelectedCar(null);
    setKmPerDay(null);
    setCalculationResults(null);
  };

  return (
    <div className="App">
      {currentPage === "welcome" && (
        <Welcome onCalculateClick={handleCalculateClick} />
      )}
      {currentPage === "participant-modal" && (
        <ParticipantModal
          onSubmit={handleParticipantSubmit}
          onClose={() => setCurrentPage("welcome")}
        />
      )}
      {currentPage === "initial-questions" && (
        <InitialQuestions onSubmit={handleQuestionsSubmit} />
      )}
      {currentPage === "results" && (
        <Results
          results={calculationResults}
          onCalculateAgain={handleCalculateAgain}
        />
      )}
    </div>
  );
}

export default App;

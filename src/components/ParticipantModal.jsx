import { useState } from "react";
import "./ParticipantModal.css";
import {
  sendParticipantToGoogleSheets,
  formatParticipantData,
} from "../services/googleSheetsService";

const ParticipantModal = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    region: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.lastName &&
      formData.phone &&
      formData.email &&
      formData.region
    ) {
      setIsSubmitting(true);
      setSubmitMessage("");

      try {
        // Send data to Google Sheets
        const formattedData = formatParticipantData(formData);
        await sendParticipantToGoogleSheets(formattedData);

        setSubmitMessage("Datos guardados exitosamente!");

        // Continue with the original onSubmit callback
        onSubmit(formData);
      } catch (error) {
        console.error("Error saving participant data:", error);
        setSubmitMessage(
          "Error al guardar los datos. Por favor, inténtalo de nuevo."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const isFormValid =
    formData.name &&
    formData.lastName &&
    formData.phone &&
    formData.email &&
    formData.region &&
    !isSubmitting;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="modal-content">
          <h2 className="modal-title">Datos del participante</h2>

          <form onSubmit={handleSubmit} className="participant-form">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Número de teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="region">
                ¿Desde qué región del país nos visitas?
              </label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona una región</option>
                <option value="La Paz">La Paz</option>
                <option value="Cochabamba">Cochabamba</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Pando">Pando</option>
                <option value="Beni">Beni</option>
                <option value="Oruro">Oruro</option>
                <option value="Potosi">Potosi</option>
                <option value="Sucre">Sucre</option>
                <option value="Tarija">Tarija</option>
              </select>
            </div>

            {submitMessage && (
              <div
                className={`submit-message ${
                  submitMessage.includes("Error") ? "error" : "success"
                }`}
              >
                {submitMessage}
              </div>
            )}

            <button
              type="submit"
              className={`submit-button ${isFormValid ? "valid" : "invalid"}`}
              disabled={!isFormValid}
            >
              {isSubmitting ? "Guardando..." : "Continuar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ParticipantModal;

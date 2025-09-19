import { useState } from "react";
import "./ParticipantModal.css";
import {
  sendParticipantToGoogleSheets,
  formatParticipantData,
} from "../services/googleSheetsService";

// PasswordInput component for privacy
const PasswordInput = ({
  id,
  name,
  value,
  onChange,
  type = "text",
  isVisible,
  onToggleVisibility,
  required = false,
}) => {
  return (
    <div className="password-input-container">
      <input
        type={isVisible ? "text" : "password"}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="password-input"
      />
      <button
        type="button"
        className="toggle-visibility-button"
        onClick={() => onToggleVisibility(name)}
        tabIndex={-1}
      >
        {isVisible ? (
          // Eye with slash (hide)
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="1"
              y1="1"
              x2="23"
              y2="23"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // Eye (show)
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="12"
              r="3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

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

  // Visibility states for password-like inputs
  const [fieldVisibility, setFieldVisibility] = useState({
    name: false,
    lastName: false,
    phone: false,
    email: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleFieldVisibility = (fieldName) => {
    setFieldVisibility((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
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
              <PasswordInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                isVisible={fieldVisibility.name}
                onToggleVisibility={toggleFieldVisibility}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Apellido</label>
              <PasswordInput
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                isVisible={fieldVisibility.lastName}
                onToggleVisibility={toggleFieldVisibility}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Número de teléfono</label>
              <PasswordInput
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                isVisible={fieldVisibility.phone}
                onToggleVisibility={toggleFieldVisibility}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <PasswordInput
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                isVisible={fieldVisibility.email}
                onToggleVisibility={toggleFieldVisibility}
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

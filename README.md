# Supercars Savings Calculator

A React application that compares the costs between gas-powered cars and electric vehicles to help users understand potential savings when switching to electric cars.

## Features

- **Welcome Page**: Displays the Supercars logo and a calculator button to start the process
- **Participant Data Capture**: Modal form to collect user information (name, last name, phone, email)
- **Initial Questions**:
  - Electric car model selection from 5 available options
  - Daily kilometers input (5-50 km range)
- **Results Page**: Detailed comparison showing:
  - Gas car vs electric car costs
  - Monthly and annual savings calculations
  - Toggle between subsidized and non-subsidized gas prices

## Electric Car Models

1. AICAR EQ ICE CREAM
2. AICAR EQ7
3. AICAR ICAR 03
4. NETA AYA
5. NETA X

## Calculation Logic

The app calculates:

- **Días de carga**: `autonomia / kmpordia`
- **Cargas mensuales**: `kmpordia / diasdecarga`
- **Costo de carga completa**: `capacidaddebateria * 0.91`
- **Costo mensual**: `costocargacompletadia * cargasmensulaes`

## Gas Car Data

- **With Subsidy**: 561 Bs/month (187 Bs per tank)
- **Without Subsidy**: 1950 Bs/month (650 Bs per tank)

## Color Scheme

- Background: `#070707`
- Text: `#ffffff`
- Borders: `#ffffff`
- Hover/Active: `#28b4fa`
- Secondary colors: `#1559ed`, `#192a3d`

## Tech Stack

- React 18
- Vite
- Plain CSS
- No external dependencies

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open your browser and navigate to the provided local URL (usually `http://localhost:5173`)

## Project Structure

```
src/
├── components/
│   ├── Welcome.jsx & Welcome.css
│   ├── ParticipantModal.jsx & ParticipantModal.css
│   ├── InitialQuestions.jsx & InitialQuestions.css
│   └── Results.jsx & Results.css
├── App.jsx & App.css
└── index.css
```

## Usage

1. Click "Calcular" on the welcome page
2. Fill in your personal information in the modal
3. Select your preferred electric car model
4. Enter your daily kilometers
5. View the detailed savings comparison
6. Toggle between subsidized and non-subsidized gas prices
7. Use "Calcular nuevamente" to start over

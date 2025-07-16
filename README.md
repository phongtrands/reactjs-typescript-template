## Tech stack

| Tool / Library      | Version          |
|---------------------|------------------|
| **Node.js**         | >=22.0.0         |
| **npm**             | >=10.x           |
| **React**           | 19.1.0           |
| **TypeScript**      | 5.7.3            |
| **Redux**           | 9.2.0            |
| **Redux Toolkit**   | 2.6.1            |
| **React Router**    | 6.30.0           |
| **Redux Thunk**     | 3.1.0            |
| **Axios**           | 1.8.4            |
| **MUI**             | v5               |
| **Eslint**          | 9.22.0           |
| **Prettier**        | 3.5.3            |
| **Vite**            | 6.2.0            |
| **Jest**            | 30.0.3           |

## Install

1. Create workspace

```bash
    npx create-react-app sppl-web --template typescript
```

## Run App

```bash
    npm start
```

## Build

```bash
    npm start
```

## Test

```bash
    npm run test
```

```bash
    npm run test:debug
```

Folder Structure of Project

src/ 
  ├── _tests_/
  ├──assets
        ├──image/
        └──styles/
  ├──components
        ├──button/
        ├──calendar/
        ├──dropdown/
        ├──epayment-tabs/
              ├──exceptions-tab/
              ├──matching-tab/
              └──summary-tab/
                    ├──search/
                    ├──table/
                    └──SummaryTab.tsx
        ├──popup/
        ├──tab/
        ├──table/
        ├──text-area/
        ├──typography/
        ├──ErrorBoundary.tsx
        ├──Loading.tsx
        └──PrivateRoute.tsx
  ├──config/
  ├──constants/
  ├──layouts/
  ├──pages/
  ├──redux/
  ├──routes/
  ├──translations/
  ├──types/
  ├──utils/
  ├──App.tsx
  └──main.tsx


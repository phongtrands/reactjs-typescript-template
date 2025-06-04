# SpplMonorepo

## Tech stack

| Tool / Library      | Version          |
|---------------------|------------------|
| **Node.js**         | >=22.0.0 <23.0.0 |
| **npm**             | >=10.x           |
| **Nx**              | 21.0.3           |
| **React**           | 19.0.0           |
| **TypeScript**      | 5.7.2            |
| **Redux**           | 9.2.0            |
| **Redux Toolkit**   | 2.8.1            |
| **React Router**    | 7.6.0            |
| **Redux Thunk**     | 3.1.0            |
| **Axios**           | 1.9.0            |
| **MUI**             | v5               |
| **Eslint**          | 9.26.0           |
| **Prettier**        | 3.5.3            |
| **Vite**            | 6.0.0            |

## Install

Install `nx` extension for VSCode

## Start development server on local

1. Run all app

```bash
    npm run dev
    nx run-many --target=serve --projects=sapfin,epayment --parallel
```
2. Run each app

```bash
    npm run dev:sapfin
    npm run dev:sapfin
    nx serve sapfin
    nx serve epayment
```
## Build

## Test

## Structure

apps/
  └── sapfin/                             # SAPFIN Portal application
        └── src/
            └── assets/                   # Static assets (images, fonts, etc.)
            └── components/               # UI components used in SAPFIN
                  └── Header.tsx
                  └── Main.tsx
            └── constants/                # Constant values used throughout SAPFIN
            └── helpers/                  # Utility/helper functions for SAPFIN
            └── pages/                    # Main page components (views) for SAPFIN
                  └── HomePage.tsx
            └── routes/                   # Route definitions for SAPFIN
                  └── RouteApp.tsx
            └── services/                 # Business logic/API services for SAPFIN
            └── store/                    # State management (e.g., Redux) for SAPFIN
            └── types/                    # TypeScript type/interface definitions for SAPFIN
            └── App.tsx                   # Main App component (entry point)
            └── main.tsx                  # Application bootstrap and rendering logic
            └── styles.scss/              # Global SCSS styles for SAPFIN
  └── epayment/                           # Epayment application
        └── src/
            └── assets/                   # Static assets (images, fonts, etc.)
            └── components/               # UI components used in Epayment
                  └── exception-tab/
                  └── matching-tab/
                  └── summary-tab/
                  └── Header.tsx
                  └── Main.tsx
            └── constants/                # Constant values used in Epayment
            └── helpers/                  # Utility/helper functions for Epayment
            └── pages/                    # Main page components (views) for Epayment
                  └── HomePage.tsx
            └── routes/                   # Route definitions for Epayment
                  └── RouteApp.tsx
            └── services/                 # Business logic/API services for Epayment
            └── store/                    # State management (e.g., Redux) for Epayment
            └── types/                    # TypeScript type/interface definitions for Epayment
            └── App.tsx                   # Main App component (entry point)
            └── main.tsx                  # Application bootstrap and rendering logic
            └── styles.scss/              # Global SCSS styles for Epayment
libs/
  └── auth/                               # Shared library for authentication and login
        └── src/
            └── components/               # Auth-related UI components
            └── constants/                # Auth-related constant values
            └── helpers/                  # Utility functions for authentication
            └── pages/                    # Pages related to authentication (login, etc.)
            └── services/                 # API services for authentication
            └── store/                    # State management for auth
            └── types/                    # TypeScript type/interface definitions for auth
            └── index.ts/     
  └── core/            
        └── services/                     # Reusable services (e.g., API logic)
            └── store/                    # Shared state management
        └── component/                    # Reusable UI components 
            └── button/                   # Button components
            └── calendar/                 # Calendar components
            └── card/                     # Card components
            └── dropdown/                 # Dropdown components
            └── table/                    # Table components
            └── tab/                      # Tab navigation components
            └── textarea/                 # Textarea input components
            └── typography/               # Typography/text components
            └── ErrorBoundary.tsx         # Global error boundary component
            └── PrivateRoute.tsx          # Component for protected/private routing
            └── index.ts
        └── types/                        # Shared TypeScript type/interface definitions                      
        └── ultils/                       # Utility/helper functions shared across apps
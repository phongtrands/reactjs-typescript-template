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
| **Jest**            | 21.0.3           |

## Install

Install `nx` extension for VSCode

## Start development server on local

1. Run all app

```bash
    npm run dev
    nx run-many --target=serve --projects=sapfin,epayment --parallel
```
2. Run sapfin app

```bash
    npm run dev:sapfin
    nx serve sapfin
```
3. Run epayment app

```bash
    npm run dev:sapfin
    nx serve sapfin
```

## Build

## Test

## Structure

apps/
  └── sapfin/
        └── src/
              └── app/
              └── assets/
              └── components/
              └── config/
              └── pages/
              └── routes/
              └── services/
              └── store/
              └── types/
              └── main.tsx
              └── styles.scss/
  └── epayment/
        └── src/
              └── app/
              └── assets/
              └── components/
              └── config/
              └── pages/
              └── routes/
              └── services/
              └── store/
              └── types/
              └── main.tsx
              └── styles.scss/      
libs/
  └── auth/
        └── src/
             └── components/
             └── pages/
             └── services/
             └── store/
             └── types/
             └── index.ts/     
  └── core/            
        └── services/ 
        └── component/
        └── types/
        └── ultils/
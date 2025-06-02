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

1. Create workspace

```bash
    npx create-nx-workspace sppl-monorepo
```
2. Create App

```bash
    npx nx generate @nx/react:application --directory=apps/sapfin --linter=eslint --name=sapfin --compiler=swc --e2eTestRunner=none --setParserOptionsProject=true --style=scss --no-interactive
```
3. Create Library

```bash
    npx nx generate @nx/react:library --directory=libs/shared/components --bundler=vite --linter=eslint --name=shared/components --compiler=swc --importPath=@shared/components --setParserOptionsProject=true --style=scss --no-interactiv # for react library
```

```bash
    npx nx generate @nx/js:library --directory=libs/shared/services --bundler=vite --importPath=@shared/services --linter=eslint --name=shared/services --setParserOptionsProject=true --no-interactive # for typescript library
```
4. Remove App/Library

```bash
    npx nx generate @nx/workspace:remove --projectName=core/config --no-interactive
```
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

4. Check source code

```bash
    npm run lint
```

## Build

## Test

## Folder Structure of Project

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
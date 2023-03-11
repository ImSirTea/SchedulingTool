# scheduling-tool

![image](https://user-images.githubusercontent.com/45457205/224491413-119c5c5e-b43d-43c3-a322-6b1d1c6771af.png)

A demo project of a rough Gantt chart tool. Not intende to be final, but a general playaround with ideas, structure, and a practical experiement. Many ways to be improved.

- Styling
- Virtual Scrolling
- Data centralisation
- Removal of duplicate code
- Optimisations of date computations
- DnD events
- Multiple event rendering, rather than one long event

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

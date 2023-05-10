### Backend Project

#### 1. Create a new project

```bash
  $ npm init -y
```

#### 2. Install initial dependencies

```bash
  $ npm i typescript @types/node -D
```

#### 3. Create a tsconfig.json file

```bash
  $ npx tsc --init --target es2020
```

#### 4. Create a src folder

```bash
  $ mkdir src
```

#### 5. Enter the src folder and create a domain folder

```bash
  $ cd src
```

```bash
  $ mkdir domain
```

#### 6. Enter the domain folder and create a entities and use-cases folder

```bash
  $ cd domain
```

```bash
  $ mkdir entities
```

```bash
  $ mkdir use-cases
```

#### 7. Enter the entities folder and create necessary entities

```bash
  $ cd entities
```

e.g.:

```bash
  $ touch instructor.ts
```

#### 8. Install vitest for testing

```bash
  $ npm i vitest -D
```

#### 9. Create a repositories folder

```bash
  $ mkdir repositories
```

#### 10. Install dayjs for date manipulation

```bash
  $ npm i dayjs
```

#### 11. In tsconfig.json, add the following lines

```json
  "baseUrl": "./",
  "paths": {
    "@/*": ["./src/*"]
  },
```

#### 12. Install vite-tsconfig-paths for tsconfig.json paths to work

```bash
  $  npm i vite-tsconfig-paths -D
```

#### 13. Create a vite.config.ts file

```bash
  $ touch vite.config.ts
```

#### 14. In vite.config.ts, add the following lines

```ts
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
  },
});
```

#### 15. In tsconfig.json, add the following lines

```json
  "types": ["vitest/globals"]
```

#### 16. Install and configure ESLint

```bash
  $ npm i eslint @rocketseat/eslint-config -D
```

#### 17. create a .eslintrc.json file

```bash
  $ touch .eslintrc.json
```

#### 18. In .eslintrc.json, add the following lines

```json
{
  "extends": [
    "@rocketseat/eslint-config/node",
    "plugin:vitest-globals/recommended"
  ],
  "rules": {
    "no-useless-constructor": "off"
  },
  "env": {
    "vitest-globals/env": true
  }
}
```

#### 19. In package.json, add the following lines

```json
  "scripts": {
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix"
  }
```

#### 20. Install eslint-plugin-vitest-globals for ESLint to recognize vitest globals

```bash
  $ npm i eslint-plugin-vitest-globals -D
```

#### 21. Install faker for generating fake data

```bash
  $ npm i faker-js/faker -D
```

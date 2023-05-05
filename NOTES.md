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
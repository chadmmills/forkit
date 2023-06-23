# forkit

#### Dev

```sh
bun run api/server/index.ts

# http://localhost:3008
```

##### Test 
![example workflow](https://github.com/chadmmills/forkit/actions/workflows/ci-test.yml/badge.svg)


```sh
bun test # or bun --watch test
```

#### Databse
**Setup**
```sh
bun db:setup
```
**Migrations**
Run existing migrations
```sh
bun db:migrate
```
Create new migration
```sh
bun db:gen:migration
```
Generate ORM types
```sh
bun db:gen:types
```

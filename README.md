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

Undo last migration

```sh
bun db:migrate:down
```

Create new migration

```sh
bun db:gen:migration name_of_migration
```

Which will generate a migration file like `1688735559059_3a759e99-29cf-76df-a6fc-161db35d302a_name_of_migration.ts` which is representative of the format `[timestamp]_[uuid]_name_of_migration.ts`

View database schema

```sh
bun db:schema
```

**Reset Database**
Delete & create new database

```sh
bun db:reset
```

Delete, create new database and run migrations

```sh
bun db:rebuild
```

**ORM**
Generate ORM types

```sh
bun db:gen:types
```

##To Dos

- [x] file based router
- [x] print out db schema
- [x] sqlite migrations up
- [x] sqlite migrations down
- [x] adding password to users
- [ ] gen ORM types from schema
- [ ] user sessions with jwt token
- [ ] authorization of router endpoints

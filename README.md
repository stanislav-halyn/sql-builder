# Sql generator

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This repo has the code for `sql-builder` application written using pure React.

# Commits convention

This repo is using [commitizen](https://github.com/commitizen/cz-cli) to follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). To be able to commit into this repo, you should run following commands:

```
  npm install -g commitizen
  npm install
```

In order to create a new commit you should type in your console:

```
  git cz
```

You'll be prompted to fill out required commit fields.

> Note: this repo is using `hasky` hooks,
> so you won't be able to push commits which don't follow the conventional commits.

# Introduction

When developing this application, I did a few decisions I would've done differently in production code:

- add interaction tests for the components
- use `react-hook-form` simplify the work with the form
- add validation for the inputs and some error handling to indicate the user his mistakes

# Code structure

This repo has two main folders:

- `features` - has all high level code like `components`, `hooks`. If we had a store, the store logic would go here as well.
- `entities` - has all low level code like `utils`, `constants`, `typings`.

This is done, in order to split the layers of logic. This way, the low level code can be used in other features and cycle dependencies can be avoided.

# Installation

Minimum required version of node is `11.15.0`.

In order to run the project, you need to rename the `.env.example` file to `.env` and set you environmental variables.

When your `.env` file is set up, you need to install dependencies with the following commands in your console:

```
  npm i
```

Now to run the project in dev or prod mode, run the following command:

```
  npm run start:dev
```

or

```
  npm run build
  npm start
```

# Linters

This project is using `stylelint` and `eslint` for linting.

```
  npm run lint
  npm run stylelint
```

# Tests

To run the tests, simply run:

```
  npm test
```

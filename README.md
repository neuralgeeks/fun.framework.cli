<h1 align="center">Welcome to fun.framework.cli 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/fun.framework.cli" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/fun.framework.cli.svg">
  </a>
  <!-- <a href="https://github.com/neuralgeeks/fun.framework.cli#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a> -->
  <a href="https://github.com/neuralgeeks/fun.framework.cli/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/neuralgeeks/fun.framework.cli/blob/master/LICENSE" target="_blank">
    <img alt="License: Apache----2.0" src="https://img.shields.io/github/license/neuralgeeks/fun.framework.cli" />
  </a>
  <a href="https://github.com/neuralgeeks/fun.framework.cli/blob/master/CODE_OF_CONDUCT.md" target="_blank">
    <img alt="Contributor Covenant" src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg" />
  </a>
</p>

> An awesome CLI for [fun.framework](https://www.npmjs.com/package/fun.framework).

## Install

```sh
npm i -g fun.framework.cli
```

You can also clone this repository locally and _link_ the binaries.

```sh
git clone https://github.com/neuralgeeks/fun.framework.cli.git
// OR
git clone git@github.com:neuralgeeks/fun.framework.cli.git
cd fun.framework.cli
npm install
npm link
```

## Usage

You can ask for help with:

```sh
fun.cli -h
```

The CLI currently has 3 generation features: **project generation** _(aka. Init)_, **service generation** and **resource generation** _(aka. RESTful entity generation)_.

### Project generation

This command inits a [fun.framework](https://www.npmjs.com/package/fun.framework) project. Some promts will be shown so that the CLI knows how to generate the best base project.

```sh
fun.cli init
```

### Service generation

This command generates a service inside a [fun.framework](https://www.npmjs.com/package/fun.framework) project. It will generate all the folder and file structure that you need to start using a new service in your project.

```sh
fun.cli generate:service
```

### Resource generation

This command generates a RESTful resource inside a [fun.framework](https://www.npmjs.com/package/fun.framework) project. You can select the service that will serve the new resource. You can also choose which parts of the resource files you want to generate, by default _the controller_, _the model_, _the repository_, _the REST validators_, _the routes file_, _the transform_ and _the testing specs_ are generated.

```sh
fun.cli generate:resource
```

## About schematics

This project uses [Angular schematics](https://www.npmjs.com/package/@angular-devkit/schematics) as the core of file system manipulation. Please show support to the awesome [Angular.io](https://angular.io/) community for making such reliable caffolding library.

## Run tests

The test are currently in development 🛠 and will be available for the next major version 👀. Please stay tune for updates ⌚️.

```sh
npm install
npm run test
```

## Author

👤 **neuralgeeks**

- Website: https://neuralgeeks.com/
- Github: [@neuralgeeks](https://github.com/neuralgeeks)
- Instagram: [@neuralgeeks](https://instagram.com/neuralgeeks)

## 🤝 Contributing

Contributions, issues and feature requests are welcome 👍🏻. Feel free to check our [issues page](https://github.com/neuralgeeks/fun.framework.cli/issues). <br /><br />Our community just started! We are doing our absolute best to make this project the best, that is why we are taking our time to stablish the contributing methodology, an in-depth contributing guide will be available soon, we are taking our time so that the project's contribution environment is the best posible. <br /><br /> Keep in mind this is our first open source project, this means we are still learning how things are done, we want to do this as best as we can!<br /><br /> If you really want to help us through this process, contact us at contact@neuralgeeks.com, we are waiting for you!

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [neuralgeeks](https://github.com/neuralgeeks).<br />
This project is [Apache----2.0](https://github.com/neuralgeeks/fun.framework.cli/blob/master/LICENSE) licensed.

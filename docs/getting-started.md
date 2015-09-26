---
title: Getting Started ∙ Demoscene Engine
---

# Getting Started

1. Start by cloning this repo, e.g.
```shell
$ git clone https://github.com/Hellenic/demoscene-engine
$ cd demoscene-engine
```

2. Install dependencies with
```shell
$ npm install
```

3. Build changes with
```shell
$ npm run build
```

4. Finally, start the example with the demoscene engine
```shell
$ npm run start
```

## Building your own demo

This project is mainly for building the engine itself but also comes with an
example demo. You can start by modifying the examples in docs/ folder and to get
familiar with the engine.

Engine codes are located in `src` folder and the tests for it are in `test`
folder. If you modify the code run `npm run build` to compile the source code
into a distributable format and under the example in docs/.

Write documentation in markdown format in `docs` folder. Run
`npm run start` to launch a development server with the documentation site and
the example demo.

Update your name in `LICENSE.txt` and project information in `package.json` and
`README.md` files.

## Building your models for the demo

I personally prefer Blender. In short, you can just model your models in Blender
and export them with THREE.js Blender exporter, which will conver them to JSON
files. These JSON files you include in your Model definition, which is then
included in Scene definition.

## How to test

```shell
$ npm run lint          # Lint your code
$ npm test              # Run unit tests, or `npm test -- --watch`
```

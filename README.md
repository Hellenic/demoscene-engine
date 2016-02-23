# Demoscene engine

JavaScript engine to build demos or games for the browser. This project is
for the engine development and comes with an example demo to get your own
project started quickly.

## Engine features

* ✓ Dynamic loading
* ✓ Progress bar
* ✓ Pointerlock
* ✓ Audio player
* ✓ Browser checks and fallbacks
* ✓ Interactions, events & actions
* ✓ Notifications
* ✓ Support for physics (Physijs)

## Project features

* ✓ Next generation JavaScript via [Babel](http://babeljs.io/)
* ✓ Publish to [NPM](https://www.npmjs.com/) as ES5, ES6+ and UMD
* ✓ [Browserify](http://browserify.org/)
* ✓ [BrowserSync](http://www.browsersync.io/)
* ✓ Pre-configured tests with [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/) and [Sinon](http://sinonjs.org/)
* ✓ Cross-platform, minimum dependencies
* ✓ Based on ([Babel starter kit](http://www.kriasoft.com/babel-starter-kit/))

## About the example demo

Example demo is located in docs/ folder, so it acts as an documentation and as
an example demo. Demo consists of only one scene, which renders only one
spinning model. Example is still work in progress.

Whole demo is started from js/main.js, which will import the DemoScene and
configure it. DemoScene will load all of it's internal dependencies dynamically
and also all the scene-related files you configured for it. Engine comes with a
built-in progress bar, if you choose to use it.

Configuration also adds a scene to it. Scene consists of the scene file itself,
models, shaders and possible some other libraries what are needed to make the
scene run. Scene can be configured as initial, which will make the engine
load only the mandatory files first, then start your scene, and then continue
with the loading of rest of files or scenes. Once a scene comes to an end,
engine will automatically clean up and change to next registered scene, if there
is more scenes available.

## Read more

Demo of this project running on [karkk.ai/demoscene-engine/](http://karkk.ai/demoscene-engine/).
Read more about the engine on my blog, [blog.karkk.ai](http://blog.karkk.ai/search/label/demoscene).

### Notes and TODOs
* Refactor and remove jQuery events, they're not good for the architecture
* Refactor classes to ES6

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

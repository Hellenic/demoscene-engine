import del from 'del';
import fs from './lib/fs';
import compile from './lib/compile';
import { rootDir } from './config';

// Clean output directories
const cleanup = async() => {
  await del(['build/*', 'lib/*', '!build/.git'], { dot: true });
  await fs.makeDir('build');
  await fs.makeDir('lib');
};

// Compile the source code into a distributable format
const library = async() => {
  const babel = require('babel');
  const files = await fs.getFiles('src');

  for (const file of files) {
    // Copy the source to lib/ as .babel.js
    await fs.copyFile('src/' + file, 'lib/' + file.substr(0, file.length - 3) + '.babel.js');

    // Transform the source with Babel
    const source = await fs.readFile('src/' + file);
    const result = babel.transform(source);
    await fs.writeFile('lib/' + file, result.code);
  }
};

// Compile library to publishable 'global'-format
const compileLibrary = async() => {
    const output = await compile.js({ file: 'lib/DemoScene.js', debug: false });
    await fs.makeDir('lib/dist/');
    await fs.writeFile('lib/dist/DemoScene.min.js', output);
};

// Compile and optimize CSS for the documentation site
const css = async() => {
  const source = await fs.readFile('./docs/css/main.css');
  const output = await compile.css(source);
  await fs.makeDir('build/css');
  await fs.writeFile('build/css/main.min.css', output);
};

// Compile HTML pages for the documentation site
const html = async() => {
  let source;
  let output;
  const toUrl = filename => filename === 'index.md' ? '/' :
    filename.substr(0, filename.length - (filename.endsWith('index.md') ? 8 : 3));
  const files = await fs.getFiles('docs');
  for (const file of files) {
    if (file.endsWith('.md')) {
      source = await fs.readFile('docs/' + file);
      output = await compile.md(source, {
        root: rootDir,
        url: toUrl(file),
        fileName: '/docs/' + file,
      });
      await fs.writeFile('build/' + file.substr(0, file.length - 3) + '.html', output);
    }
  }
};

// Bundle and optimize JavaScript code for the documentation site
const javascript = async() => {
  const output = await compile.js({ file: 'docs/js/main.js', debug: false });
  await fs.makeDir('build/js');
  await fs.writeFile('build/js/main.min.js', output);
};

// Copy library files into the docs/ folder
const copylib = async() => {
    const files = await fs.getFiles('lib');

    for (const file of files) {
        if (!file.endsWith('.babel.js')) {
            await fs.copyFile('lib/' + file, 'docs/lib/' + file);
        }
    }
};

// Copy static files from docs/ into the build/ folder
const assets = async() => {
    const files = await fs.getFiles('docs');

    for (const file of files) {
        if (!file.endsWith('.md') && !file.endsWith('.html') && !file.startsWith('css') && !file.startsWith('js')) {
            await fs.copyFile('docs/' + file, 'build/' + file);
        }
    }
};

// Run all build steps in sequence
export default async () => {
  try {
    console.log('Cleaning...');
    await cleanup();
    console.log('Compiling library...');
    await library();
    console.log('Compiling publishable library...');
    await compileLibrary();

    console.log('Compiling CSS...');
    await css();
    console.log('Compiling HTML...');
    await html();
    console.log('Compiling JavaScript');
    await javascript();

    console.log('Copying library files...');
    await copylib();
    console.log('Copying static files...');
    await assets();

    console.log('Done.');
  } catch (err) {
    console.error(err.stack);
  }
};

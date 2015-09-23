import 'babel/polyfill';
import config from './config';

const run = async() => {
    console.log("Setup Demoscene", config);
};

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}

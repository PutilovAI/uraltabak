'use strict';
let dist = './dist';
let src = './src';
const conf = {
  path : {
    js : {
      src : ['./src/blocks/**/*.js', './src/assets/js/*.js'],
      vendor: [
        './src/assets/libs/owl.carousel/dist/owl.carousel.min.js',
        './src/assets/libs/selectize/dist/js/standalone/selectize.js',
        './src/assets/libs/jquery.maskedinput/src/jquery.maskedinput.js'
      ],
      dest: "./dist/assets/js"
    },
    dist: dist,
    src: src
  },
  name: {
    zip: 'uraltabak.zip'
  }
}

module.exports = conf;

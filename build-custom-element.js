const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    './dist/portlet-press-detail/runtime.js',
    './dist/portlet-press-detail/polyfills.js',
    './dist/portlet-press-detail/main.js'
  ];
  await fs.ensureDir('angular-elements-build');
  await fs.removeSync('angular-elements-build/press-detail.js');
  await concat(files, 'angular-elements-build/press-detail.js');

  await fs.copy('./src/app/app.component.css', 'angular-elements-build/styles.css');
})();


const packageJson = require('../../package.json');

export const environment = {
  appName: 'ws-ngx-demo',
  envName: 'DEV',
  API: 'api',
  HOST: 'http://localhost',
  PORT: '8080',
  production: false,
  test: false,
  i18nPrefix: '',
  hmr: true,
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  }
};

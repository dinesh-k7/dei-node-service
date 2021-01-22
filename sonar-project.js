const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    token: 'a07bdeea67b22026f825a11b355fec43df66740e',
    options: {
      'sonar.sources': './src',
      'sonar.exclusions': './src/serviceWorkerRegistration.js',
    },
  },
  () => {},
);

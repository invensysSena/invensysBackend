sonar-scanner  -Dsonar.projectKey=sonarqube \
  -Dsonar.sources=C:\Users\ospin\Documents\proyecto personal\invensysBackend \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=admin \
  -Dsonar.password=admin1234 \
  -Dsonar.language=js \
  -Dsonar.sourceEncoding=UTF-8 \
  -Dsonar.exclusions=**/node_modules/**,**/coverage/**,**/dist/**,**/build/**,**/public/**,**/src/setupTests.js,**/src/serviceWorker.js,**/src/index.js,**/src/App.js,**/src/reportWebVitals.js,**/src/react-app-env.d.ts,**/src/index.tsx,**/src/App.tsx,**/src/reportWebVitals.ts \
  -Dsonar.tests=src \
  -Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx \
  -Dsonar.testExecutionReportPaths=test-report.xml \
  -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info \
  -Dsonar.eslint.reportPaths=eslint-report.json \
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
  -Dsonar.coverage.exclusions=**/node_modules/**,**/coverage/**,**/dist/**,**/build/**,**/public/**,**/src/setupTests.js,**/src/serviceWorker.js,**/src/index.js,**/src/App.js,**/src/reportWebVitals.js,**/src/react-app-env.d.ts,**/src/index.tsx,**/src/App.tsx,**/src/reportWebVitals.ts \
  -Dsonar.coverageReportPaths=coverage/lcov.info \
  -Dsonar.testExecutionReportPaths=test-report.xml \
  -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info \
  -Dsonar.eslint.reportPaths=eslint-report.json \
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
  -Dsonar.coverage.exclusions=**/node_modules/**,**/coverage/**,**/dist/**,**/build/**,**/public/**,**/src/setupTests.js,**/src/serviceWorker.js,**/src/index.js,**/src/App.js,**/src/reportWebVitals.js,**/src/react-app-env.d
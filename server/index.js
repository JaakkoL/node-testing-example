const app = require('./app/index');
const config = require('./app/config');

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}.`);
});

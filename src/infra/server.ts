import 'dotenv/config';
import 'reflect-metadata';
import '@infra/typeorm';
import '@infra/tsyringe';

import App from '@infra/http/app';

const PORT = process.env.PORT || 3333;

const app = new App();

app.server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

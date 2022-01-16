import { Router } from 'express';

import productsRouter from './products.routes';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: 'Hello Multiway' }),
);

routes.use('/products', productsRouter);

export default routes;

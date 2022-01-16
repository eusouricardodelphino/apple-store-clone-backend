import { Router } from 'express';
import { getRepository } from 'typeorm';

import Product from '../models/Product';
import CreateProductRepository from '../services/CreateProductService';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const productsRepository = getRepository(Product);
  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.post('/', async (request, response) => {
  try {
    const { name, price } = request.body;

    const createProduct = new CreateProductRepository();

    const product = await createProduct.execute({
      name,
      price,
    });

    return response.json(product);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

productsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne({ where: { id } });

    if (!product) {
      throw Error('This product does not exist');
    }

    await productsRepository.delete(id);

    return response.status(200).json({ message: 'Product deleted' });
  } catch (err: any) {
    return response.status(404).json({ error: err.message });
  }
});

export default productsRouter;

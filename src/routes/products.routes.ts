/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import uploadConfig from '../config/upload';
import Product from '../models/Product';
import CreateProductRepository from '../services/CreateProductService';
import UpdateProductImageService from '../services/UpdateProductImageService';

const productsRouter = Router();
const upload = multer(uploadConfig);

productsRouter.get('/', async (request, response) => {
  const productsRepository = getRepository(Product);
  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.get('/:id', async (request, response) => {
  try {
    const productRepository = getRepository(Product);

    const { id } = request.params;

    const product = await productRepository.findOne({ where: { id } });

    if (!product) {
      throw new Error('Product not found');
    }

    return response.status(200).json(product);
  } catch (err: any) {
    return response.status(404).json({ error: err.message });
  }
});

productsRouter.post('/', async (request, response) => {
  try {
    const { name, price, description } = request.body;

    const createProduct = new CreateProductRepository();

    const product = await createProduct.execute({
      name,
      price,
      description,
    });

    return response.json(product);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

productsRouter.put('/:id', async (request, response) => {
  try {
    const productRepository = getRepository(Product);

    const { id } = request.params;

    const product = await productRepository.findOne({ where: { id } });

    const { name, price, description } = request.body;

    if (!product) {
      throw new Error('Product not found');
    }

    if (product && name) {
      product.name = name;
    }

    if (product && price) {
      product.price = price;
    }

    if (product && description) {
      product.description = description;
    }

    await productRepository.update(id, product);

    return response.json(product);
  } catch (err: any) {
    return response.status(404).json({ error: err.message });
  }
});

productsRouter.patch(
  '/:id/image',
  upload.single('product_img'),
  async (request, response) => {
    try {
      const updateProductImage = new UpdateProductImageService();

      const product = await updateProductImage.execute({
        product_id: request.params.id,
        productFileName: request.file.filename,
      });

      return response.json(product);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  },
);

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

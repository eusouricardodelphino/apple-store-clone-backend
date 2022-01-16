import { getRepository } from 'typeorm';

import Product from '../models/Product';
import ProductRequest from '../interfaces/ProductRequest';

class CreateProductRepository {
  public async execute({ name, price }: ProductRequest): Promise<Product> {
    const productsRepository = getRepository(Product);

    const product = productsRepository.create({
      name,
      price,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductRepository;

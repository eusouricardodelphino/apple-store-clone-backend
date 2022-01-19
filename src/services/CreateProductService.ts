import { getRepository } from 'typeorm';

import Product from '../models/Product';
import ProductRequest from '../interfaces/ProductRequest';

class CreateProductRepository {
  public async execute({
    name,
    price,
    description,
  }: ProductRequest): Promise<Product> {
    const productsRepository = getRepository(Product);

    const product = productsRepository.create({
      name,
      price,
      description,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductRepository;

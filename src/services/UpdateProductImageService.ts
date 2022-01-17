import fs from 'fs';
import path from 'path';

import { getRepository } from 'typeorm';

import uploadConfig from '../config/upload';
import Product from '../models/Product';
import UpdateProductImageRequest from '../interfaces/UpdateProductImageRequest';

class UpdateProductImageService {
  public async execute({
    product_id,
    productFileName,
  }: UpdateProductImageRequest): Promise<Product> {
    const productRepository = getRepository(Product);

    const product = await productRepository.findOne({
      where: { id: product_id },
    });

    if (!product) {
      throw new Error('Product, not found');
    }

    if (product.image) {
      const productImageFilePath = path.join(
        uploadConfig.directory,
        product.image,
      );
      const productImageExists = await fs.promises.stat(productImageFilePath);

      if (productImageExists) {
        await fs.promises.unlink(productImageFilePath);
      }
    }

    product.image = productFileName;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductImageService;

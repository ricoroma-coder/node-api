import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

class ListProductService {
	public async execute(): Promise<Product[]> {
		const productsRepository = getCustomRepository(ProductRepository)

		return productsRepository.find()
	}
}

export default ListProductService

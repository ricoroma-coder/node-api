import { Router } from 'express'
import ProductsController from '../controllers/ProductsController'

const productsRouter = Router()
const productsController = new ProductsController()

productsRouter.get('/', productsController.index)
productsRouter.post('/', productsController.create)
productsRouter.put('/:id', productsController.update)
productsRouter.get('/:id', productsController.show)
productsRouter.delete('/:id', productsController.delete)

export default productsRouter

import { Router } from "express"
import productsRouter from "@modules/products/routes/products.routes"
import usersRouter from "@modules/users/routes/users.routes"
import sessionsRouter from "@modules/users/routes/sessions.routes"


import testRouter from "./test.routes"

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)


routes.use('/test', testRouter)

export default routes

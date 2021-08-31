import { Router } from 'express'
import UsersController from '../controllers/UsersController'
import { celebrate, Joi, Segments } from 'celebrate'
import isAuthenticated from '../middlewares/isAuthenticated'
import multer from 'multer'
import UploadController from '../controllers/UploadController'
import upload from '@config/upload'

const usersRouter = Router()
const usersController = new UsersController()
const uploadController = new UploadController()
const uploadConfig = multer(upload)

usersRouter.get('/', isAuthenticated, usersController.index)

usersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		}
	}),
	usersController.create
)

usersRouter.put(
	'/:id',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	usersController.update
)

usersRouter.patch(
	'/avatar',
	isAuthenticated,
	uploadConfig.single('avatar'),
	uploadController.update
)

usersRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	usersController.show
)

usersRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	usersController.delete
)

export default usersRouter

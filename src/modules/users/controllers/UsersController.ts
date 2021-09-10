import { Request, Response } from "express"
import CreateUserService from "../services/CreateUserService"
import UpdateUserService from "../services/UpdateUserService"
import ListUserService from "../services/ListUserService"
import ShowUserService from "../services/ShowUserService"
import DeleteUserService from "../services/DeleteUserService"


//import fetch from "node-fetch"


export default class UsersController {
	public async index(request: Request, response: Response): Promise<Response> {
		const list = new ListUserService()
		const users = await list.execute()
		return response.json(users)
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params
		const show = new ShowUserService()
		const user = await show.execute({ id })
		return response.json(user)
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body
		const create = new CreateUserService()
		const user = await create.execute({ name, email, password })
		return response.json(user)
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body
		const { id } = request.params
		const update = new UpdateUserService()
		const user = await update.execute({ id, name, email, password })
		return response.json(user)
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params
		const deleteUser = new DeleteUserService()
		await deleteUser.execute({ id })
		return response.json([])
	}

	public async test(request: Request, response: Response): Promise<Response> {

		/////////////////////////////////

		const axios = require('axios')
		let param: any = ''

		await axios.get('http://127.0.0.1:3000/test?test=test')
		.then((ret: Response) => {
			param = ret.json()
		  })
		  .catch((error: any) => {
			console.log(error)
		  })

		//////////////////////////////////

		return response.json(param)
	}

	public async test2(request: Request, response: Response): Promise<Response> {

		const obj = {
			headers: request.headers,
			body: request.body
		}

		return response.json(obj)
	}
}

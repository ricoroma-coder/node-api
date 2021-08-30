import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import UpdateUserService from "../services/UpdateUserService";
import ListUserService from "../services/ListUserService";
import ShowUserService from "../services/ShowUserService";
import DeleteUserService from "../services/DeleteUserService";

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
}

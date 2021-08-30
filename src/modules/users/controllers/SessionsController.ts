import { Request, Response } from "express";
import CreateSessionService from "../services/CreateSessionService";

export default class SessionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const create = new CreateSessionService()
		const user = await create.execute(request.body)
		return response.json(user)
	}
}

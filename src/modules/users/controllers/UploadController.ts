import { Request, Response } from "express";
import UpdateAvatarService from "../services/UploadAvatarService";

export default class UploadController {
	public async update(request: Request, response: Response): Promise<Response> {
		const updateAvatar = new UpdateAvatarService()

		const user = await updateAvatar.execute({
			userId: request.user.id,
			avatar: request.file?.filename
		})

		return response.json(user)
	}
}

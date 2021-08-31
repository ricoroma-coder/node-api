import AppError from "@shared/errors/AppError"
import path from "path"
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User"
import UsersRepository from "../typeorm/repositories/UsersRepository"
import uploadConfig from '@config/upload'
import fs from "fs"

interface IRequest {
	userId: string
	avatar: string | undefined
}

class UpdateAvatarService {
	public async execute({ userId, avatar }: IRequest): Promise<User> {
		const userRepository = getCustomRepository(UsersRepository)
		const user = await userRepository.findById(userId)

		if (!user)
			throw new AppError("User not found", 404)

		if (typeof avatar == 'undefined')
			throw new AppError("Image not found", 404)

		if (user.avatar) {
			const avatarPath = path.join(uploadConfig.directory, user.avatar)
			const fileExists = await fs.promises.stat(avatarPath)

			if (fileExists)
				await fs.promises.unlink(avatarPath)
		}

		user.avatar = avatar

		await userRepository.save(user)

		return user
	}
}

export default UpdateAvatarService

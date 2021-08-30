import AppError from "@shared/errors/AppError"
import { compare, hash } from "bcryptjs"
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User"
import UsersRepository from "../typeorm/repositories/UsersRepository"

interface IRequest {
	email: string
	password: string
}

class CreateSessionService {
	public async execute({ email, password }: IRequest): Promise<User> {
		const userRepository = getCustomRepository(UsersRepository)
		const user = await userRepository.findByEmail(email)

		if (!user)
			throw new AppError ("Unauthorized!", 401)

		const passConfirm = await compare(password, user.password)

		if (!passConfirm)
			throw new AppError ("Unauthorized!", 401)

		return user
	}
}

export default CreateSessionService

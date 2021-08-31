import AppError from "@shared/errors/AppError"
import { compare, hash } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User"
import UsersRepository from "../typeorm/repositories/UsersRepository"

interface IRequest {
	email: string
	password: string
}

interface IResponse {
	user: User
	token: string
}

class CreateSessionService {
	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const userRepository = getCustomRepository(UsersRepository)
		const user = await userRepository.findByEmail(email)

		if (!user)
			throw new AppError ("Unauthorized!", 401)

		const passConfirm = await compare(password, user.password)

		if (!passConfirm)
			throw new AppError ("Unauthorized!", 401)

		const token = sign(
			{},
			"468494e592514961154ca58d4e344c0b", //md5 gerado de "asdqwezxcfghrtyvbnyuihjknmlop"
			{subject: user.id, expiresIn: '1d'}
		)

		return { user, token }
	}
}

export default CreateSessionService

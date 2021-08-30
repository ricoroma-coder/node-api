import AppError from "@shared/errors/AppError"
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User"
import UsersRepository from "../typeorm/repositories/UsersRepository"

interface IRequest {
	name: string
	email: string
	password: string
}

class CreateUserService {
	public async execute({name, email, password}: IRequest): Promise<User> {
		const userRepository = getCustomRepository(UsersRepository)
		const emailExists = await userRepository.findByEmail(email)
		const nameExists = await userRepository.findByName(name)

		if (emailExists)
			throw new AppError ("E-mail already exists")

		if (nameExists)
			throw new AppError ("Username already exists")

		const user = userRepository.create({
			name,
			email,
			password
		})

		await userRepository.save(user)

		return user
	}
}

export default CreateUserService

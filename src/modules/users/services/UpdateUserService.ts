import AppError from "@shared/errors/AppError"
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User"
import UsersRepository from "../typeorm/repositories/UsersRepository"

interface IRequest {
	id: string
	name: string
	email: string
	password: string
}

class UpdateUserService {
	public async execute({ id, name, email, password }: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository)

		const user = await usersRepository.findOne(id)

		if (!user)
			throw new AppError("Product not found", 404)

		const nameExists = await usersRepository.findByName(name)
		const emailExists = await usersRepository.findByName(name)

		if ((nameExists || emailExists) && user.name != name && user.email != email)
			throw new AppError("User already exists")

		user.name = name
		user.email = email
		user.password = password

		await usersRepository.save(user)

		return user
	}
}

export default UpdateUserService

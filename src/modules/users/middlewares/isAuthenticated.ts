import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
	const authHeader = request.headers.authorization

	if (!authHeader)
		throw new AppError("Inválid JWT Token", 401)

	const [,token] = authHeader.split(" ")

	try {
		const decodedToken = verify(token, auth.jwt.secret)

		return next()
	} catch {
		throw new AppError("Inválid JWT Token", 401)
	}
}

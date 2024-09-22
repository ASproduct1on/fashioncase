'use server'

import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const getAuthStatus = async () => {
	const { getUser } = getKindeServerSession()
	const user = await getUser()

	// Логируем данные пользователя, полученные от Kinde
	console.log('User from Kinde:', user)

	if (!user?.id || !user.email) {
		throw new Error('Invalid user data from Kinde. Missing user ID or email')
	}

	// Проверка существования пользователя
	const existingUser = await db.user.findFirst({
		where: { id: user.id },
	})

	if (existingUser) {
		// Логируем, если пользователь уже существует
		console.log('User already exists in the database:', existingUser)
	} else {
		// Логируем процесс создания пользователя
		console.log('Creating new user with ID:', user.id)

		await db.user.create({
			data: {
				id: user.id,
				email: user.email,
			},
		})

		console.log('New user created with ID:', user.id)
	}

	return { success: true }
}

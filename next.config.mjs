/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['utfs.io'],
	},
	async headers() {
		return [
			{
				// Применяем заголовки ко всем маршрутам
				source: '/(.*)',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: 'https://fashioncase.vercel.app', // Разрешаем запросы с этого домена
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET, POST, OPTIONS', // Методы, которые разрешены
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'X-Requested-With, Content-Type, Authorization', // Разрешённые заголовки
					},
				],
			},
		]
	},
}

export default nextConfig

import { notice } from '../store/notice'

const url = 'http://localhost'

const port = 8081
const path = '/phl'

const headers = new Headers()

headers.append('Content-Type', 'application/json')

const request = (data: Record<string, any>): RequestInit => {
	return {
		method: 'POST',
		body: JSON.stringify(data),
		headers,
	}
}

interface Res<T = any> {
	success: boolean
	errmsg: string
	errcode: number
	data: T
}

export interface ErrorRes {
	errmsg: string
	errcode: number
}

export type FaildRes = Res & ErrorRes

export type SuccessRes<T = any> = Res & {}

type Result<T = any> = {
	[x: string]: Res<T>
}

export const _fetch = async (data: Record<string, any>): Promise<Result> => {
	return fetch(`${url}:${port}${path}`, request(data))
		.then((res) => res.ok && res.json())
		.catch((err) =>
			notice({
				status: 'error',
				message: err,
			})
		)
}

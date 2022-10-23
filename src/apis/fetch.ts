import { notice } from './mitt'

const url = `http://${window.location.hostname}`

const port = 8083
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

type Result<T> = {
	[x: string]: Res<T>
}

type Request = Record<string, any> | Record<string, any>[]

export const _fetch = async <T extends Request>(
	data: T
): Promise<T extends Record<string, any>[] ? Result<any>[] : Result<any>> => {
	return fetch(`${url}:${port}${path}`, request(data))
		.then((res) => res.ok && res.json())
		.catch((err) =>
			notice({
				status: 'error',
				message: err,
			})
		)
}

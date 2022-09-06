import React, { useEffect, useState } from 'react'
import { _fetch } from '../../apis/fetch'
import Table from '../../components/table'
import AnimateWraper from '../../components/transition/AnimateWraper'

const columns = [
	{
		label: 'ip_address',
		field: 'ip_address',
	},
	{ label: 'user', field: 'username' },
	{
		label: 'network_type',
		field: 'network_type',
	},
	{ label: 'is_used', field: 'is_used' },
]

const IpAddress = () => {
	const [ipRows, setIpRows] = useState([])

	useEffect(() => {
		const getIps = async () => {
			const { findIps } = await _fetch({ findIps: {} })

			console.log(findIps)

			if (findIps) {
				const { success, data } = findIps

				const newData = data.map((row: any) => ({
					...row,
					is_used: row['is_used'] ? '已使用' : '未使用',
				}))

				console.log(newData)

				success && setIpRows(newData)

				console.log(data)
			}
		}
		getIps()
	}, [])

	return (
		<AnimateWraper className="w-full">
			<Table columns={columns} rows={ipRows} />
		</AnimateWraper>
	)
}

export default IpAddress

import { Button } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { _fetch } from '../../apis/fetch'
import { notice } from '../../apis/mitt'
import CustomDialog, {
	CustomDialogContentProps,
} from '../../components/dialogs/CustomDialog'
import Table, { Operate, TableToolbarExtensions } from '../../components/table'
import AnimateWraper from '../../components/transition/AnimateWraper'
import { useAppDispatch, useAppSelector } from '../../store'
import { updateIpAddress } from '../../store/ipAddress'
import { IpAddressInfo } from '../../types'

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
	const ipAddressRows = useAppSelector((state) => state.ipAddress)
	const users = useAppSelector((state) => state.users)

	const [openDialog, setOpenDialog] = useState(false)

	const [curSelectRow, setCurSelectRow] = useState<IpAddressInfo | {}>({})

	const dispatch = useAppDispatch()

	// 操作栏
	const operate = useMemo<Operate>(
		() => ({
			header: '操作',
			cell: (value) => (
				<Button
					onClick={() => (setCurSelectRow(value), setOpenDialog(true))}
				>{`分配`}</Button>
			),
		}),
		[]
	)

	// 分配ip
	const contents: CustomDialogContentProps[] = [
		{
			label: '使用人',
			type: 'select',
			options: users.map((user) => user.username),
			onChange: (val) => setCurSelectRow({ ...curSelectRow, username: val }),
		},
	]

	const handlerAssignIp = async () => {
		const { ASSIGN_IP_TO_PERSON } = await _fetch({
			ASSIGN_IP_TO_PERSON: curSelectRow,
		})

		if (ASSIGN_IP_TO_PERSON) {
			const { success, data, errmsg } = ASSIGN_IP_TO_PERSON

			console.log(ASSIGN_IP_TO_PERSON)

			return success
				? (dispatch(updateIpAddress(curSelectRow as IpAddressInfo)),
				  notice({ status: 'success', message: '分配Ip成功' }),
				  setOpenDialog(false))
				: notice({ status: 'error', message: errmsg })
		}

		return notice({
			status: 'error',
			message: '分配Ip失败',
		})
	}

	return (
		<AnimateWraper className="w-full">
			<Table columns={columns} rows={ipAddressRows} operate={operate} />

			{openDialog ? (
				<CustomDialog
					title="分配IP"
					open={openDialog}
					onClose={() => setOpenDialog(false)}
					contents={contents}
					onOk={handlerAssignIp}
				></CustomDialog>
			) : (
				<></>
			)}
		</AnimateWraper>
	)
}

export default IpAddress

import { AddIcon } from '../../components/icons'
import Table, {
	TableColumn,
	TableToolbarExtensions,
} from '../../components/table'
import AnimateWraper from '../../components/transition/AnimateWraper'

import { useEffect, useMemo, useState } from 'react'
import { _fetch } from '../../apis/fetch'
import { notice, confirm } from '../../apis/mitt'
import AddDialog, { AddDialogContent } from '../../components/dialogs/AddDialog'
import { useAppDispatch, useAppSelector } from '../../store'
import {
	addNetworkType,
	deleteNetworkTypes,
	setNetworkType,
} from '../../store/networkType'
import { NetworkTypeInfo } from '../../types'
import { NetworkTypeInfoTable } from '../../tables'
import { Button } from '@mui/material'
import { setIpAddress } from '../../store/ipAddress'
import { setDevices } from '../../store/device'

const addDialogContent: AddDialogContent[] = [
	{
		label: '网络类型名称',
		field: 'network_name',
		required: true,
	},
	{
		label: '开始地址',
		field: 'ip_address_start',
	},
	{
		label: '结束地址',
		field: 'ip_address_end',
	},
	{
		label: '子网掩码',
		field: 'netmask',
	},
	{
		label: '网关',
		field: 'gateway',
	},
	{
		label: 'DNS',
		field: 'dns',
	},
	{
		label: '备注',
		field: 'descript',
	},
]

const NetworkType = () => {
	const networkTypes = useAppSelector((state) => state.networkTypes)

	const dispatch = useAppDispatch()

	const [openDialog, setOpenDialog] = useState(false)

	const extensions: TableToolbarExtensions = useMemo(
		() => [
			{
				icon: <AddIcon color="primary" />,
				title: '新增网络类型',
				onClick: () => setOpenDialog(true),
			},
		],
		[]
	)

	// 操作
	const operate = useMemo(
		() => ({
			header: '操作',
			cell: (row: any) => (
				<>
					<Button
						size="small"
						sx={{ fontSize: '0.4rem' }}
						onClick={() => console.log(row)}
					>{`编辑`}</Button>
					<Button
						size="small"
						sx={{ fontSize: '0.4rem' }}
						onClick={() => handleDeleteNetworkType(row)}
					>{`删除`}</Button>
				</>
			),
		}),
		[]
	)

	// 创建
	const handleAddNetworkType = async (val: Partial<NetworkTypeInfo>) => {
		const [{ create_network_type }, { find_ips }, { find_devices }] =
			await _fetch([
				{ create_network_type: val },
				{
					find_ips: {},
				},
				{ find_devices: {} },
			])

		if (create_network_type) {
			const { success, data, errmsg } = create_network_type

			if (find_ips.success) {
				dispatch(setIpAddress(find_ips.data))
			}

			if (find_devices.success) {
				dispatch(setDevices(find_devices.data))
			}

			return success
				? (dispatch(addNetworkType(data)),
				  notice({ status: 'success', message: '创建网络类型成功' }),
				  setOpenDialog(false))
				: notice({ status: 'error', message: errmsg })
		}

		return notice({ status: 'error', message: '创建网络类型失败' })
	}

	// 删除
	const handleDeleteNetworkType = async (info: NetworkTypeInfo) => {
		const res = await confirm({
			title: '提示',
			message: '删除此信息会同步删除与此有关的全部资料',
		})

		if (!res) {
			return
		}

		const [{ delete_network_type }, { find_ips }, { find_devices }] =
			await _fetch([
				{ delete_network_type: info },
				{ find_ips: {} },
				{ find_devices: {} },
			])

		if (delete_network_type) {
			const { success, data, errmsg } = delete_network_type

			if (find_ips.success) {
				dispatch(setIpAddress(find_ips.data))
			}

			if (find_devices.success) {
				dispatch(setDevices(find_devices.data))
			}
			return success
				? (dispatch(deleteNetworkTypes(info)),
				  notice({ status: 'success', message: `删除网络类型成功` }),
				  setOpenDialog(false))
				: notice({ status: 'error', message: errmsg })
		}

		return notice({
			status: 'error',
			message: `删除网络类型失败`,
		})
	}

	return (
		<AnimateWraper className="w-full">
			<NetworkTypeInfoTable
				// columns={columns}
				rows={networkTypes}
				operate={operate}
				extensions={extensions}
			/>

			{openDialog && (
				<AddDialog
					open={openDialog}
					onClose={() => setOpenDialog(false)}
					title={'新增网络类型'}
					content={addDialogContent}
					onAdd={(val) => handleAddNetworkType(val)}
				/>
			)}
		</AnimateWraper>
	)
}

export default NetworkType

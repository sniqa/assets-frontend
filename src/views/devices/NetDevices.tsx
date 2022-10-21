import AddIcon from '@mui/icons-material/Add'
import {
	Autocomplete,
	Button,
	ButtonGroup,
	TextField,
	TextFieldProps,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import Table2, {
	TableDialog,
	TableToolbarExtensions,
} from '../../components/table'
import AnimateWraper from '../../components/transition/AnimateWraper'
import DialogWraper from '../../components/dialogs/DialogWraper'
import { useAppDispatch, useAppSelector } from '../../store'
import { DeviceInfoTable } from '../../tables'
import CustomSelect from '../../components/dialogs/CustomSelect'
import { _fetch } from '../../apis/fetch'
import { notice, confirm } from '../../apis/mitt'

import { setIpAddress, updateIpAddress } from '../../store/ipAddress'
import { setNetworkType } from '../../store/networkType'
import { DeviceInfo } from '../../types'
import { NetDevicesInfoTable } from '../../tables/UserInfoTable'
import { addDevice, deleteDevice, updateDevice } from '../../store/device'

const initialDeviceInfo: Omit<DeviceInfo, '_id'> = {
	user: '',
	location: '',
	network_type: '',
	ip_address: '',
	mac: '',
	device_model: '',
	device_category: 'netDevice',
	system_version: '',
	disk_sn: '',
	remark: '',
}

const NetDevice = () => {
	const users = useAppSelector((state) => state.users)
	const departments = useAppSelector((state) => state.department)
	const networkTypes = useAppSelector((state) => state.networkTypes)
	const ipAddress = useAppSelector((state) => state.ipAddress)
	const deviceBase = useAppSelector((state) => state.deviceBase)
	const device = useAppSelector((state) =>
		state.devices.filter((device) => device.device_category === 'netDevice')
	)

	const dispatch = useAppDispatch()

	const [curNetworkTypeIps, setCurNetworkTypeIps] = useState<string[]>([])

	const [openAddDialog, setOpenAddDialog] = useState(false)
	const [openEditDialog, setOpenEditDialog] = useState(false)

	const [deviceInfo, setDeviceInfo] = useState(initialDeviceInfo)

	// 编辑时用来记录数据
	const [editDeviceInfo, setEditDeviceInfo] = useState({
		_id: '',
		...initialDeviceInfo,
	})
	// 编辑时记录原始网络类型和ip
	const [originDevice, setOriginDevice] = useState({
		network_type: '',
		ip_address: '',
	})

	// 创建设备
	const onAddDevice = async () => {
		const [{ create_device }, { find_ips }, { find_network_types }] =
			await _fetch([
				{ create_device: deviceInfo },
				{
					find_ips: {},
				},
				{
					find_network_types: {},
				},
			])

		if (create_device) {
			const { success, data, errmsg } = create_device

			if (find_ips.success) {
				dispatch(setIpAddress(find_ips.data))
			}

			if (find_network_types.success) {
				dispatch(setNetworkType(find_network_types.data))
			}

			return success
				? (dispatch(addDevice({ ...data, ...deviceInfo })),
				  notice({ status: 'success', message: '创建设备成功!' }),
				  setDeviceInfo(initialDeviceInfo),
				  setOpenAddDialog(false))
				: notice({ status: 'error', message: errmsg })
		}

		return notice({
			status: 'error',
			message: '创建网络设备失败',
		})
	}

	// 删除设备
	const onDeleteDevice = async (row: DeviceInfo) => {
		const confirmRes = await confirm({
			title: '提示',
			message: `此操作会删除该设备及回收ip`,
		})

		if (!confirmRes) {
			return
		}

		const [{ delete_device }, { find_ips }, { find_network_types }] =
			await _fetch([
				{
					delete_device: row,
				},
				{ find_ips: {} },
				{ find_network_types: {} },
			])

		if (delete_device) {
			const { success, data, errmsg } = delete_device

			if (find_ips) {
				dispatch(setIpAddress(find_ips.data))
			}
			if (find_network_types) {
				dispatch(setNetworkType(find_network_types.data))
			}

			return success
				? (dispatch(deleteDevice(row)),
				  notice({ status: 'success', message: '删除成功' }),
				  setOpenAddDialog(false))
				: notice({
						status: 'error',
						message: errmsg,
				  })
		}
		return notice({ status: 'error', message: '删除失败' })
	}

	// 编辑设备
	const onEditDevice = async () => {
		setOpenEditDialog(false)

		const [{ modify_device }, { find_ips }, { find_network_types }] =
			await _fetch([
				{ modify_device: editDeviceInfo },
				{ find_ips: {} },
				{ find_network_types: {} },
			])

		if (modify_device) {
			const { success, data, errmsg } = modify_device

			if (success) {
				dispatch(updateDevice(editDeviceInfo))

				if (find_network_types) {
					dispatch(setNetworkType(find_network_types.data))
				}

				if (find_ips) {
					dispatch(setIpAddress(find_ips.data))
				}

				return notice({ status: 'success', message: '修改成功' })
			} else {
				return notice({
					status: 'error',
					message: errmsg,
				})
			}
		}

		return notice({ status: 'error', message: '修改失败' })
	}

	// 编辑按钮点击时触发
	const onEditBtnClick = (row: DeviceInfo) => {
		setOpenEditDialog(true)
		setOriginDevice({
			network_type: row.network_type,
			ip_address: row.ip_address,
		})
		setEditDeviceInfo(row)
	}

	// toolbar extensitons
	const extensions: TableToolbarExtensions = [
		{
			icon: <AddIcon color="primary" />,
			title: '新增',
			onClick: () => setOpenAddDialog(!openAddDialog),
		},
	]

	const operate = useMemo(
		() => ({
			header: '操作',
			cell: (row: any) => (
				<>
					<Button
						size="small"
						sx={{ fontSize: '0.4rem' }}
						onClick={() => onEditBtnClick(row)}
					>{`编辑`}</Button>
					<Button
						size="small"
						sx={{ fontSize: '0.4rem' }}
						onClick={() => onDeleteDevice(row)}
					>{`删除`}</Button>
				</>
			),
		}),
		[]
	)

	return (
		<AnimateWraper className="w-full">
			<NetDevicesInfoTable
				// columns={columns}
				rows={device}
				extensions={extensions}
				operate={operate}
			/>

			{openAddDialog && (
				<DialogWraper
					title={'新增设备'}
					open={openAddDialog}
					onClose={() => setOpenAddDialog(false)}
					onOk={onAddDevice}
				>
					<CustomSelect
						label={`使用人`}
						value={deviceInfo.user}
						options={users.map((user) => user.username)}
						onChange={(val) => setDeviceInfo({ ...deviceInfo, user: val })}
					/>

					<CustomSelect
						label="物理地址"
						value={deviceInfo.location}
						options={departments.flatMap((d) => d.locations)}
						onChange={(val) => setDeviceInfo({ ...deviceInfo, location: val })}
					/>

					<CustomSelect
						label="网络类型"
						value={deviceInfo.network_type}
						options={networkTypes.map(
							(networkType) => networkType.network_name
						)}
						onChange={(val) => {
							setCurNetworkTypeIps(
								ipAddress
									.filter((ip) => ip.network_type === val && !ip.is_used)
									.map((ip) => ip.ip_address)
							)

							setDeviceInfo({ ...deviceInfo, network_type: val })
						}}
					/>

					<CustomSelect
						label="IP"
						value={deviceInfo.ip_address}
						options={curNetworkTypeIps}
						onChange={(value) =>
							setDeviceInfo({ ...deviceInfo, ip_address: value })
						}
					/>

					<CustomInput
						label={`MAC`}
						value={deviceInfo.mac}
						onChange={(e) =>
							setDeviceInfo({ ...deviceInfo, mac: e.target.value })
						}
					/>

					<CustomSelect
						label="设备型号"
						value={deviceInfo.device_model}
						options={deviceBase.map((device) => device.device_model)}
						onChange={(value) =>
							setDeviceInfo({ ...deviceInfo, device_model: value })
						}
					/>

					<CustomInput
						label={`系统版本`}
						value={deviceInfo.system_version}
						onChange={(e) =>
							setDeviceInfo({ ...deviceInfo, system_version: e.target.value })
						}
					/>

					<CustomInput
						label={`磁盘SN`}
						value={deviceInfo.disk_sn}
						onChange={(e) =>
							setDeviceInfo({ ...deviceInfo, disk_sn: e.target.value })
						}
					/>

					<div className="w-full p-2">
						<TextField
							multiline
							value={deviceInfo.remark}
							label="备注"
							className="w-full"
							rows={3}
							onChange={(e) =>
								setDeviceInfo({ ...deviceInfo, remark: e.target.value })
							}
						/>
					</div>
				</DialogWraper>
			)}

			{openEditDialog && (
				<DialogWraper
					title={'编辑设备'}
					open={openEditDialog}
					onClose={() => setOpenEditDialog(false)}
					onOk={() => onEditDevice()}
				>
					<CustomSelect
						label={`使用人`}
						value={editDeviceInfo.user}
						options={users.map((user) => user.username)}
						onChange={(val) =>
							setEditDeviceInfo({ ...editDeviceInfo, user: val })
						}
					/>

					<CustomSelect
						label="物理地址"
						value={editDeviceInfo.location}
						options={departments.flatMap((d) => d.locations)}
						onChange={(val) =>
							setEditDeviceInfo({ ...editDeviceInfo, location: val })
						}
					/>

					<CustomSelect
						label="网络类型"
						value={editDeviceInfo.network_type}
						options={networkTypes.map(
							(networkType) => networkType.network_name
						)}
						onChange={(val) => {
							setEditDeviceInfo({
								...editDeviceInfo,
								network_type: val,
								ip_address: '',
							})
						}}
					/>

					<CustomSelect
						label="IP"
						value={editDeviceInfo.ip_address}
						options={(() => {
							const ips = ipAddress
								.filter(
									(ip) =>
										ip.network_type === editDeviceInfo.network_type &&
										!ip.is_used
								)
								.map((ip) => ip.ip_address)

							return editDeviceInfo.network_type === originDevice.network_type
								? [originDevice.ip_address, ...ips]
								: ips
						})()}
						onChange={(value) =>
							setEditDeviceInfo({ ...editDeviceInfo, ip_address: value })
						}
					/>

					<CustomInput
						label={`MAC`}
						value={editDeviceInfo.mac}
						onChange={(e) =>
							setEditDeviceInfo({ ...editDeviceInfo, mac: e.target.value })
						}
					/>

					<CustomSelect
						label="设备型号"
						value={editDeviceInfo.device_model}
						options={deviceBase.map((device) => device.device_model)}
						onChange={(value) =>
							setEditDeviceInfo({ ...editDeviceInfo, device_model: value })
						}
					/>

					<CustomInput
						label={`系统版本`}
						value={editDeviceInfo.system_version}
						onChange={(e) =>
							setEditDeviceInfo({
								...editDeviceInfo,
								system_version: e.target.value,
							})
						}
					/>

					<CustomInput
						label={`磁盘SN`}
						value={editDeviceInfo.disk_sn}
						onChange={(e) =>
							setEditDeviceInfo({
								...editDeviceInfo,
								disk_sn: e.target.value,
							})
						}
					/>

					<div className="w-full p-2">
						<TextField
							multiline
							label="备注"
							value={editDeviceInfo.remark}
							className="w-full"
							rows={3}
							onChange={(e) =>
								setEditDeviceInfo({
									...editDeviceInfo,
									remark: e.target.value,
								})
							}
						/>
					</div>
				</DialogWraper>
			)}
		</AnimateWraper>
	)
}

export default NetDevice

const CustomInput = (props: Omit<TextFieldProps, 'size'>) => (
	<div className="w-1/2 p-2">
		<TextField size="small" {...props} />
	</div>
)

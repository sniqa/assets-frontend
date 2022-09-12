import { AlertColor, SnackbarCloseReason } from '@mui/material'

export interface NoticebarStatus {
	status: AlertColor
	message: string
	onClose?: (
		event: Event | React.SyntheticEvent<any, Event>,
		reason: SnackbarCloseReason
	) => void
}

export interface ConfirmbarState {
	title: string
	message: string
}

interface WithId {
	id: string
}

// user
export interface UserInfo {
	_id: string
	account?: string
	username?: string
	nickname?: string
	number?: number
	department?: string
	location?: string
}

export type UserInfoWithId = WithId & UserInfo

// network type
export interface NetworkTypeInfo {
	_id: string
	network_name: string
	ip_address_start: string
	ip_address_end: string
	netmask: string
	gateway: string
	dns: string[]
	used_number: number
	unused_number: number
	total_number: number
	desript: string
}

export type NetworkTypeInfoWithId = WithId & NetworkTypeInfo

// department
export interface DepartmentInfo {
	_id: string
	department_name: string
	locations: string[]
}

export type DepartmentInfoWithId = WithId & DepartmentInfo

// deviceBase
export interface DeviceBaseInfo {
	_id: string
	device_model: string //设备型号
	device_type: string //设备类型
	manufacture_date: string //出厂日期
	shelf_life: string //保质期
}

export type DeviceBaseInfoWithId = WithId & DeviceBaseInfo

// ip address
export interface IpAddressInfo {
	_id: string
	username: string
	ip_address: string
	network_type: string
	is_used: boolean
}

export type IpAddressInfoWithId = WithId & IpAddressInfo

export interface DeviceInfo {
	_id: string
	user: string
	location: string
	network_type: string
	ip_address: string
	mac: string
	device_model: string
	system_version: string
	disk_sn: string
	remark: string
}

export type DeviceInfoWithId = WithId & DeviceInfo

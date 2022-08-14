import { AlertColor, SnackbarCloseReason } from '@mui/material'

export interface NoticebarStatus {
	status: AlertColor
	message: string
	onClose?: (
		event: Event | React.SyntheticEvent<any, Event>,
		reason: SnackbarCloseReason
	) => void
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

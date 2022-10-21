import Table, { TableColumn, CustomTableProps } from '../components/table'
import { DeviceInfo } from '../types'

const userColumns: TableColumn[] = [
	{ label: '用户名称', field: 'username' },
	{ label: '昵称', field: 'nickname' },
	{ label: '部门', field: 'department' },
	{ label: '办公室', field: 'location' },
	{ label: '号码', field: 'number' },
]

export const UserInfoTable = (props: Omit<CustomTableProps, 'columns'>) => (
	<Table {...props} columns={userColumns} />
)

const ipColumns: TableColumn[] = [
	{
		label: 'ip地址',
		field: 'ip_address',
	},
	{ label: '使用人', field: 'username' },
	{
		label: '网络类型',
		field: 'network_type',
	},
	{ label: '状态', field: 'is_used' },
]

export const IpAddressInfoTable = (
	props: Omit<CustomTableProps, 'columns'>
) => <Table {...props} columns={ipColumns} />

const networkTypeColumns: TableColumn[] = [
	{
		label: '类型名称',
		field: 'network_name',
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
		label: 'ip已使用',
		field: 'used_number',
	},
	{
		label: 'ip未使用',
		field: 'unused_number',
	},
	{
		label: 'ip总数',
		field: 'total_number',
	},
	{
		label: '备注',
		field: 'descript',
		isSelect: false,
	},
]

export const NetworkTypeInfoTable = (
	props: Omit<CustomTableProps, 'columns'>
) => <Table {...props} columns={networkTypeColumns} />

// device
const deviceColumns: TableColumn[] = [
	{
		label: '使用人',
		field: 'user',
	},
	{ label: '物理位置', field: 'location' },
	{
		label: '网络类型',
		field: 'network_type',
	},
	{ label: 'Ip地址', field: 'ip_address' },
	{ label: 'MAC', field: 'mac' },
	{ label: '设备型号', field: 'device_model' },
	{ label: '系统版本', field: 'system_version', isSelect: false },
	{ label: '磁盘SN', field: 'disk_sn', isSelect: false },
	{ label: '备注', field: 'remark' },
]

export const DeviceInfoTable = (props: Omit<CustomTableProps, 'columns'>) => (
	<Table {...props} columns={deviceColumns} />
)

const PeripheralColumns: TableColumn[] = [
	{
		label: '使用人',
		field: 'user',
	},
	{ label: '物理位置', field: 'location' },
	{
		label: '网络类型',
		field: 'network_type',
	},
	{ label: 'Ip地址', field: 'ip_address' },
	{ label: 'MAC', field: 'mac' },
	{ label: '设备型号', field: 'device_model' },
	{ label: '备注', field: 'remark' },
]
export const PeripheralsTable = (props: Omit<CustomTableProps, 'columns'>) => (
	<Table {...props} columns={PeripheralColumns} />
)

const NetDeviceColumns: TableColumn[] = [
	{
		label: '使用人',
		field: 'user',
	},
	{ label: '物理位置', field: 'location' },
	{
		label: '网络类型',
		field: 'network_type',
	},
	{ label: 'Ip地址', field: 'ip_address' },
	{ label: 'MAC', field: 'mac' },
	{ label: '设备型号', field: 'device_model' },
	{ label: '备注', field: 'remark' },
]
export const NetDevicesInfoTable = (
	props: Omit<CustomTableProps, 'columns'>
) => <Table {...props} columns={NetDeviceColumns} />

export enum RouterPath {
	ROOT = '/',
	HOME = 'home',
	ROOT_HOME = '/home',
	SETTINGS = 'settings',

	USER = 'user',
	USER_INFO = 'user_info',
	DEPARTMENT = 'department',

	DOCUMENTS = 'documents',

	GRAPHS = 'graphs',

	LOGS = 'logs',
	MESSAGE = 'message',

	NETWORK = 'network',
	NETWORK_TYPE_SUMMARY = 'network_type_summary',
	NETWORK_TYPE = 'network_type',
	IP_ADDRESS = 'ip_address',

	DEVICES = 'devices',
	DEVICES_SUMMARY = 'devices_summary',
	COMPUTER = 'computers',
	NETWORK_DEVICES = 'net_devices',
	PERIPHERALS = 'peripherals',
	OTHER_DEVICES = 'other',
	DEVICE_BASE = 'devices_base',
}

const routerMap = {
	home: '主页',
	settings: '设置',
	user: '用户',
	user_info: '用户信息',
	department: '部门',

	documents: '文档',

	logs: '日志',
	message: '消息',
	network: '网络',
	network_type_summary: '网络类型概要',
	network_type: '网络类型',

	ip_address: 'ip地址',
	devices: '设备',
	devices_summary: '设备概要',
	computers: '计算机',
	net_devices: '网络设备',
	peripherals: '外设',
	devices_base: '设备基础资料',
}

export const getRouterMap = (key: string) => Reflect.get(routerMap, key) || ''

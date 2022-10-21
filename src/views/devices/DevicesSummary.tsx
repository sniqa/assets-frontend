import AnimateWraper from '../../components/transition/AnimateWraper'
import { init } from 'echarts'
import { useEffect, useMemo, useRef } from 'react'
import PieCharts from '../../components/charts/Pie'
import { useAppDispatch, useAppSelector } from '../../store'
import { _fetch } from '../../apis/fetch'
import { setDevices } from '../../store/device'
import { setNetworkType } from '../../store/networkType'
import { DeviceInfo, NetworkTypeInfo } from '../../types'

const DevicesSummary = () => {
	const devices = useAppSelector((state) =>
		state.devices.filter((device) => device.device_category === 'computer')
	)
	const peripheral = useAppSelector((state) =>
		state.devices.filter((device) => device.device_category === 'peripheral')
	)
	const netDevice = useAppSelector((state) =>
		state.devices.filter((device) => device.device_category === 'netDevice')
	)
	const networkTypes = useAppSelector((state) => state.networkTypes)

	return (
		<AnimateWraper className="w-full h-full">
			<div className="w-full h-full flex justify-between">
				<PieCharts
					title="办公设备"
					total_sum={peripheral.length}
					data={getNetworkDeviceNumber(networkTypes, peripheral)}
					className={`w-1/3 h-full`}
				/>
				<PieCharts
					title="计算机"
					total_sum={devices.length}
					data={getNetworkDeviceNumber(networkTypes, devices)}
					className={`w-1/3 h-full`}
				/>
				<PieCharts
					title="网络设备"
					total_sum={netDevice.length}
					data={getNetworkDeviceNumber(networkTypes, netDevice)}
					className={`w-1/3 h-full`}
				/>
			</div>
		</AnimateWraper>
	)
}

export default DevicesSummary

const getNetworkDeviceNumber = (
	networkTypes: NetworkTypeInfo[],
	devices: DeviceInfo[]
) => {
	return networkTypes.map((networkType) => ({
		value: devices
			.filter((device) => device.network_type === networkType.network_name)
			.length.toString(),
		name: networkType.network_name,
	}))
}

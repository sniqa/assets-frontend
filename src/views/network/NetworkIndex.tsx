import NavigateItem from '../../components/NavigateItem'
import AnimateWraper from '../../components/transition/AnimateWraper'
import { RouterPath } from '../../router/path'

const NetworkIndex = () => {
	return (
		<AnimateWraper className="w-full">
			<NavigateItem
				title={'网络类型'}
				detail={'ip, mac的详细资料'}
				to={RouterPath.NETWORK_TYPE}
			/>
			{/* <NavigateItem
				title={'网络设备'}
				detail={'交换机,路由器,光电转换器的清单资料'}
				to={RouterPath.NETWORK_DEVICES}
			/>
			<NavigateItem
				title={'外设'}
				detail={'打印机,扫描仪,复印机的资料'}
				to={RouterPath.PERIPHERALS}
			/>
			<NavigateItem
				title={'其他'}
				detail={'包括一些碎纸机等其他设备的资料'}
				to={RouterPath.OTHER_DEVICES}
			/> */}
		</AnimateWraper>
	)
}

export default NetworkIndex

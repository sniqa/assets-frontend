import NavigateItem from '../../components/NavigateItem'
import AnimateWraper from '../../components/transition/AnimateWraper'
import { RouterPath } from '../../router/path'

const Devices = () => {
	return (
		<AnimateWraper className="w-full">
			<NavigateItem
				title={'设备汇总'}
				detail={'饼状图设备汇总'}
				to={RouterPath.DEVICES_SUMMARY}
			/>
			<NavigateItem
				title={'终端'}
				detail={'台式,一体机,笔记本的详细资料'}
				to={RouterPath.COMPUTER}
			/>
			<NavigateItem
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
				title={'数字证书'}
				detail={'数字征书的管理'}
				to={RouterPath.USB_KEY}
			/>
			<NavigateItem
				title={'设备基础资料'}
				detail={'设备的一些公共基础资料库'}
				to={RouterPath.DEVICE_BASE}
			/>
		</AnimateWraper>
	)
}

export default Devices

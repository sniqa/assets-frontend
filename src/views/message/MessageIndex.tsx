// 消息主界面

import NavigateItem from '../../components/NavigateItem'
import AnimateWraper from '../../components/transition/AnimateWraper'
import { RouterPath } from '../../router/path'

const UserIndex = () => {
	return (
		<AnimateWraper className="w-full">
			<NavigateItem title={'日志'} detail={'日志'} to={RouterPath.LOGS} />
			{/* <NavigateItem
				title={'用户'}
				detail={'用户资料'}
				to={RouterPath.USER_INFO}
			/> */}
			{/*	<NavigateItem
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

export default UserIndex

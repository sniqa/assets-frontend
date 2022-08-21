import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from 'react-router-dom'
import { RouterPath } from './router/path'

import { lazy } from 'react'
import { Aside, Header, Layout, Main, Noticebar } from './components/layouts'
import SuspenseLoading from './components/transition/SuspenseLoading'
import Home from './views/Home'

const User = lazy(() => import('./views/user/UserIndex'))
const UserInfo = lazy(() => import('./views/user/UserInfo'))
const Department = lazy(() => import('./views/user/Department'))

const Network = lazy(() => import('./views/network/NetworkIndex'))
const NetworkType = lazy(() => import('./views/network/NetworkType'))

const Devices = lazy(() => import('./views/devices/DevicesIndex'))
const Computers = lazy(() => import('./views/devices/Computers'))
const NetDevices = lazy(() => import('./views/devices/NetDevices'))
const Peripherals = lazy(() => import('./views/devices/Peripherals'))
const OtherDevices = lazy(() => import('./views/devices/Other'))

const MessageIndex = lazy(() => import('./views/message/MessageIndex'))
const Logs = lazy(() => import('./views/message/Logs'))

const App = () => {
	return (
		<BrowserRouter>
			<SuspenseLoading
				element={
					<Routes>
						<Route
							path={RouterPath.ROOT}
							element={
								<Layout
									header={<Header />}
									main={<Main />}
									aside={<Aside />}
									notice={<Noticebar />}
								/>
							}
						>
							{/* 重定向到Home */}
							<Route
								index
								element={<Navigate to={RouterPath.HOME} replace />}
							/>
							{/* 主页 */}
							<Route path={RouterPath.HOME} element={<Home />} />
							{/* 用户 */}
							<Route
								path={RouterPath.USER}
								element={<SuspenseLoading element={<Outlet />} />}
							>
								<Route index element={<User />} />
								<Route path={RouterPath.USER_INFO} element={<UserInfo />} />
								<Route path={RouterPath.DEPARTMENT} element={<Department />} />
							</Route>
							{/* 设备 */}
							<Route
								path={RouterPath.DEVICES}
								element={<SuspenseLoading element={<Outlet />} />}
							>
								<Route index element={<Devices />}></Route>
								<Route
									path={RouterPath.COMPUTER}
									element={<Computers />}
								></Route>
								<Route
									path={RouterPath.NETWORK_DEVICES}
									element={<NetDevices />}
								></Route>
								<Route
									path={RouterPath.PERIPHERALS}
									element={<Peripherals />}
								></Route>
								<Route
									path={RouterPath.OTHER_DEVICES}
									element={<OtherDevices />}
								></Route>
							</Route>
							{/* 网络 */}
							<Route
								path={RouterPath.NETWORK}
								element={<SuspenseLoading element={<Outlet />} />}
							>
								<Route index element={<Network />}></Route>
								<Route
									path={RouterPath.NETWORK_TYPE}
									element={<NetworkType />}
								></Route>
							</Route>
							{/* 消息 */}
							<Route
								path={RouterPath.MESSAGE}
								element={<SuspenseLoading element={<Outlet />} />}
							>
								<Route index element={<MessageIndex />} />
								<Route path={RouterPath.LOGS} element={<Logs />} />
							</Route>
							{/* end of 消息*/}
						</Route>
					</Routes>
				}
			/>
		</BrowserRouter>
	)
}

export default App

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

const User = lazy(() => import('./views/User'))

const Network = lazy(() => import('./views/network/Network'))
const NetworkType = lazy(() => import('./views/network/NetworkType'))

const Devices = lazy(() => import('./views/devices/Devices'))
const Computers = lazy(() => import('./views/devices/Computers'))
const NetDevices = lazy(() => import('./views/devices/NetDevices'))
const Peripherals = lazy(() => import('./views/devices/Peripherals'))
const OtherDevices = lazy(() => import('./views/devices/Other'))

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
							<Route path={RouterPath.USER} element={<User />} />

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
						</Route>
					</Routes>
				}
			/>
		</BrowserRouter>
	)
}

export default App

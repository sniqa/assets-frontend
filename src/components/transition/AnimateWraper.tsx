import { AnimatePresence, motion } from 'framer-motion'

interface AnimateWraperProps {
	children: JSX.Element | Array<JSX.Element> | string
	className?: string
}

const AnimateWraper = ({ children, className }: AnimateWraperProps) => {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ x: '2%' }}
				animate={{ x: 0 }}
				exit={{ x: '-10%' }}
				className={className}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}

export default AnimateWraper

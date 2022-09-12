import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, FC } from 'react'

type AnimateWraperProps = {
	children?: ReactNode
	className?: string
}

const AnimateWraper: FC<AnimateWraperProps> = ({ children, className }) => {
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

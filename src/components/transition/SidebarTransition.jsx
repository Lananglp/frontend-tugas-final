import { motion } from 'framer-motion';

function SidebarTransition(props) {

    const {className, children} = props;

    const animationConfiguration = {
        initial: { x: '-5rem', opacity: 0 },
        animate: { x: '0rem', opacity: 1 },
        exit: { x: '-5rem', opacity: 0 },
    };

  return (
    <>
        <div>
            <motion.div
                variants={animationConfiguration}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className={className}
            >
                {children}
            </motion.div>
        </div>
    </>
  )
}

export default SidebarTransition
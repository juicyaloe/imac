import classes from './IChoice.module.css';
import {ReactNode, useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

interface Size {
    width: string;
    height: string;
}

interface Prop {
    size?: Size;
    title?: string;
    children?: ReactNode;
}

const IChoice = ({
    size = {width: '18rem', height: '13rem'},
    title = '알림',
    children = null,
}: Prop) => {
    const [isVisible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        console.log(isVisible);
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={`${classes.test_container} ${classes.body}`}
                    style={size}
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    exit={{scale: -20}}
                    transition={{
                        duration: 0.1,
                        delay: 0.1,
                        ease: 'easeIn',
                    }}
                >
                    <div className={classes.titlebox}>{title}</div>
                    <div className={classes.textbox}>{children}</div>
                    <div className={classes.btnbox}>여기 버튼이 오네요</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IChoice;

import classes from './IChoice.module.css';
import {ReactNode} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

interface BtnSet {
    name: string;
    Fnc: (...any) => void;
    value: any[];
}
interface Prop {
    width?: string;
    height?: string;
    title?: string;
    children?: ReactNode;
    Btn?: BtnSet[];
    isFlow: boolean;
    handleIsFlow: (any) => void;
}

const IChoice = ({
    width = '18rem',
    height = '13rem',
    title = '알림',
    children = '',
    Btn = [
        {
            name: '확인',
            Fnc: () => null,
            value: [],
        },
    ],
    isFlow,
    handleIsFlow,
}: Prop) => {
    const onClick = () => {
        handleIsFlow(false);
    };
    return (
        <AnimatePresence>
            {isFlow && (
                <motion.div
                    className={`${classes.test_container} ${classes.body}`}
                    style={{width, height}}
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
                    <div className={classes.btnbox}>
                        {Btn.map((data, index) => (
                            <motion.button
                                className={classes.btn}
                                onClick={(e) => {
                                    data.Fnc(...data.value);
                                    onClick();
                                }}
                                style={{backgroundColor: 'rgb(50,180,0)'}}
                                whileHover={{
                                    scale: 1.05,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 400,
                                        damping: 10,
                                    },
                                }}
                                key={index}
                            >
                                {data.name}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IChoice;

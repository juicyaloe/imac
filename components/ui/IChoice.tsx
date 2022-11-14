import classes from './IChoice.module.css';
import {ReactNode, useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

export type buttonOption = 'yes' | 'no' | 'close' | number;

interface buttonSet {
    text: string;
    option?: buttonOption[];
}

interface Size {
    width: string;
    height: string;
}

interface Prop {
    size?: Size;
    title?: string;
    children?: ReactNode;
    btnSet?: buttonSet[];
    messageFunc: (any) => void;
}

const IChoice = ({
    size = {width: '18rem', height: '13rem'},
    title,
    children,
    btnSet,
    messageFunc,
}: Prop) => {
    const [isVisible, setVisible] = useState<boolean>(true);

    const btnFunc = (options: buttonOption[]) => () => {
        messageFunc([...options]);

        options.forEach((option) => {
            switch (option) {
                case 'close':
                    setVisible((value) => !value);
                    break;
                default:
                    break;
            }
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className={classes.wrap}>
                    <motion.div
                        className={classes.popup}
                        style={size}
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        exit={{scale: 0}}
                        transition={{
                            duration: 0.5,
                            delay: 0.1,
                            ease: 'easeIn',
                        }}
                    >
                        <div className={classes.title}>{title ?? '알림'}</div>
                        <div className={classes.content}>
                            {children ?? '해당 내용을 확인하셨습니까?'}
                        </div>
                        <div className={classes.footer}>
                            {btnSet?.map((btn, index) => (
                                <button
                                    key={index}
                                    onClick={btnFunc(btn!.option ?? ['close'])}
                                >
                                    {btn.text}
                                </button>
                            )) ?? (
                                <button onClick={btnFunc(['close'])}>
                                    확인
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default IChoice;

import classes from './INotice.module.css';
import {motion, AnimatePresence} from 'framer-motion';
import {useEffect, useState} from 'react';

type Prop = {
    readonly text: string;
    readonly color: string;
    readonly isFlow: boolean;
    readonly handleIsFlow: (any) => void;
};

export default function INotice({text, color, isFlow, handleIsFlow}: Prop) {
    useEffect(() => {
        let onTimer = setTimeout(() => {
            handleIsFlow(false);
        }, 3000);

        return () => {
            clearTimeout(onTimer);
        };
        // eslint-disable-next-line
    }, [isFlow]);

    return (
        <AnimatePresence>
            {isFlow && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className={`${classes.default}`}
                    style={{backgroundColor: `${color}`, color: 'white'}}
                >
                    {text}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

import classes from './INotice.module.css';
import {motion, AnimatePresence} from 'framer-motion';

type Prop = {
    text: string;
    mode: boolean;
};

export default function INotice({text, mode}: Prop) {
    return (
        <AnimatePresence>
            {mode && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className={`${classes.default} ${
                        mode ? classes.fail : classes.success
                    }`}
                >
                    {text}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

import classes from './INotice.module.css';
import {useEffect, useState} from 'react';

type Mode = 'Success' | 'Fail';

type Prop = {
    text: string;
    mode: Mode;
};

export default function INotice({text, mode}: Prop) {
    const [isOn, setIsOn] = useState<boolean>(false);

    useEffect(() => {
        let onTimer = setTimeout(() => {
            setIsOn(true);
        }, 500);

        let offTimer = setTimeout(() => {
            setIsOn(false);
        }, 3500);

        return () => {
            clearTimeout(onTimer);
            clearTimeout(offTimer);
        };
    }, []);

    return (
        <div
            className={`${classes.default} ${
                mode == 'Success' ? classes.success : classes.fail
            } ${isOn ? classes.on : classes.off}`}
        >
            {text}
        </div>
    );
}

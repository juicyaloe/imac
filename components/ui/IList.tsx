import {Fragment, ReactNode} from 'react';
import classes from './IList.module.css';

interface Prop {
    list: string[];
    children: ReactNode;
}

export default function IList({list, children}: Prop) {
    return (
        <Fragment>
            {list.map((data, index) => (
                <div className={classes.list} key={index}>
                    {data} {children}
                </div>
            ))}
        </Fragment>
    );
}

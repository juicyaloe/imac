import {Fragment} from 'react';
import classes from './IList.module.css';

interface Prop {
    list: string[];
}

export default function IList({list}: Prop) {
    return (
        <Fragment>
            {list.map((data, index) => (
                <div className={classes.list} key={index}>
                    {data}
                </div>
            ))}
        </Fragment>
    );
}

import {Fragment} from 'react';
import IList from '../components/ui/IList';
import classes from './test.module.css';

export default function Test() {
    const dataList = ['dasd', 'dwd', 'asd'];
    return (
        <Fragment>
            <IList list={dataList}></IList>
            <div className={classes.div}>qwdqw</div>
        </Fragment>
    );
}

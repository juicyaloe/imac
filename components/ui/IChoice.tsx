import classes from './IChoice.module.css';
import {ReactNode} from 'react';
interface Prop {
    width?: string;
    height?: string;
    title?: string;
    children?: ReactNode;
    onClickBtn: (any) => void;
}

const IChoice = ({
    width = '18rem',
    height = '13rem',
    title = '알림',
    children = '',
    onClickBtn,
}: Prop) => {
    return (
        <div>
            <div
                className={`${classes.test_container} ${classes.body}`}
                style={{width, height}}
            >
                <div className={classes.titlebox}>{title}</div>
                <div className={classes.textbox}>{children}</div>
                <div className={classes.btnbox}>
                    <button
                        className={classes.btn}
                        onClick={(e) => {
                            onClickBtn(true);
                        }}
                        style={{backgroundColor: 'rgb(0,80,255)'}}
                    >
                        수락
                    </button>
                    <button
                        className={classes.btn}
                        onClick={(e) => {
                            onClickBtn(false);
                        }}
                        style={{backgroundColor: 'rgb(255,80,0)'}}
                    >
                        거절
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IChoice;

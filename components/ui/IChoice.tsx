import classes from './IChoice.module.css';

interface Prop {
    width: string;
    height: string;
    title: string;
}

const IChoice = ({width = '18rem', height = '13rem', title = '알림'}: Prop) => {
    const onClick = () => {
        console.log('asdf');
    };
    return (
        <div>
            <div
                className={`${classes.test_container} ${classes.body}`}
                style={{width, height}}
            >
                <div className={classes.titlebox}>{title}</div>
                <div className={classes.textbox_container}>Context :</div>
                <div className={classes.btnbox}>
                    <button className={classes.btn} onClick={onClick}>
                        Btn A
                    </button>
                    <button className={classes.btn}>Btn B</button>
                </div>
            </div>
        </div>
    );
};

export default IChoice;

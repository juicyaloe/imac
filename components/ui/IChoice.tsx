import classes from './IChoice.module.css';

const IChoice = () => {
    const onClick = () => {
        console.log('asdf');
    };
    const styles = {
        // 가변크기 테스트
        width: '1000px',
        height: '1000px',
    };
    return (
        <div>
            <div
                className={`${classes.test_container} ${classes.body}`}
                style={styles}
            >
                <div className={classes.titlebox}>Title</div>
                <div className={classes.textbox_container}>
                    <div className={classes.textbox}>Context :</div>
                </div>
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

import classes from './index.module.css';

function LogIn(props) {
    return (
        <div className={classes.bbody}>
            <div className={classes.body}></div>
            <div className={classes.grad}></div>
            <div className={classes.header}>
                <div>
                    성프야<span>Fantasy</span>
                </div>
            </div>
            <br></br>
            <div className={classes.login}>
                <input type='text' placeholder='username' name='user'></input>
                <br></br>
                <input
                    type='password'
                    placeholder='password'
                    name='password'
                ></input>
                <br></br>
                <input type='button' value='Login'></input>
            </div>
        </div>
    );
}

export default LogIn;
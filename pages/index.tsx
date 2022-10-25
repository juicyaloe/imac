import classes from './index.module.css';
import {useRecoilState} from 'recoil';
import {useRef} from 'react';
import Link from 'next/link';
import {UserToken} from '../states/users';

function LogIn(props) {
    const [token, setToken] = useRecoilState(UserToken);

    const id = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    async function auth(body) {
        let response = await fetch('http://52.78.87.49/api/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'applications/json',
            },
            body: JSON.stringify(body),
        });

        if (response.status === 200) {
            let response_json = await response.json();
            setToken(response_json.Token);
        } else {
            return alert('ID 또는 PW 를 다시 확인해라 국노야ㅡㅡ');
        }
    }

    const LoginFunc = (e) => {
        e.preventDefault();
        if (!id) {
            return alert('ID를 입력해라 국노야ㅡㅡ');
        } else if (!password) {
            return alert('Password를 입력해라 국노야ㅡㅡ');
        } else {
            let body = {
                username: id,
                password: password,
            };
            auth(body);
        }
    };

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
                <input type='text' id='id' placeholder='ID' ref={id}></input>
                <br></br>
                <input
                    type='password'
                    placeholder='password'
                    ref={password}
                ></input>
                <br></br>
                <button onClick={(e) => LoginFunc(e)}>Login</button>
                <Link href='/signup'>
                    <button>Sign Up</button>
                </Link>
            </div>
        </div>
    );
}

export default LogIn;

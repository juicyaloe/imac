import classes from './index.module.css';
import {useRecoilState} from 'recoil';
import {useRef, useState, useEffect} from 'react';
import Link from 'next/link';
import {UserToken} from '../states/users';
import INotice from '../components/ui/INotice';
function LogIn(props) {
    const [token, setToken] = useRecoilState(UserToken);
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const [loginText, setLoginText] = useState<string>();

    const id = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    async function auth(body) {
        let response = await fetch('http://52.78.87.49/api/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (response.status === 200) {
            let response_json = await response.json();
            setToken(response_json.Token);
        } else {
            setIsLoginFailed(true);
            setLoginText(
                '로그인 실패 : ID 또는 PW 를 다시 확인해라 국노야ㅡㅡ',
            );
            return;
        }
    }

    useEffect(() => {
        let onTimer = setTimeout(() => {
            setIsLoginFailed(false);
        }, 3000);

        return () => {
            clearTimeout(onTimer);
        };
    }, [isLoginFailed]);

    const LoginFunc = (e) => {
        e.preventDefault();
        if (id.current!.value === '') {
            setIsLoginFailed(true);
            setLoginText('로그인 실패 : ID를 입력해라 국노야ㅡㅡ');
            return;
        } else if (password.current!.value === '') {
            setIsLoginFailed(true);
            setLoginText('로그인 실패 : Password를 입력해라 국노야ㅡㅡ');
            return;
        } else {
            let body = {
                username: id.current?.value,
                password: password.current?.value,
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
                <INotice text={`${loginText}`} mode={isLoginFailed}></INotice>
            </div>
        </div>
    );
}

export default LogIn;

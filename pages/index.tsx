import classes from './index.module.css';
import {useRecoilState} from 'recoil';
import {useRef, useState, useEffect} from 'react';
import Link from 'next/link';
import {UserToken} from '../states/users';
import INotice from '../components/ui/INotice';
function LogIn(props) {
    const [token, setToken] = useRecoilState(UserToken);
    const [loginSetting, setLoginSetting] = useState<[string, string]>([
        '',
        '',
    ]);
    const [isFlow, setIsFlow] = useState<boolean>(false);

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
            handleIsFlow(true);
            setLoginSetting(['로그인 성공', 'blue']);
        } else {
            handleIsFlow(true);
            setLoginSetting([
                '로그인 실패 : ID 또는 PW 를 다시 확인해라 국노야ㅡㅡ',
                'red',
            ]);
            return;
        }
    }

    const LoginFunc = (e) => {
        e.preventDefault();
        if (id.current!.value === '') {
            handleIsFlow(true);
            setLoginSetting(['로그인 실패 : ID를 입력해라 국노야ㅡㅡ', 'red']);
            return;
        } else if (password.current!.value === '') {
            handleIsFlow(true);
            setLoginSetting([
                '로그인 실패 : Password를 입력해라 국노야ㅡㅡ',
                'red',
            ]);
            return;
        } else {
            let body = {
                username: id.current?.value,
                password: password.current?.value,
            };
            auth(body);
        }
    };

    const handleIsFlow = (value: boolean) => {
        setIsFlow(value);
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
                <input
                    type='text'
                    id='id'
                    placeholder='ID'
                    ref={id}
                    onKeyPress={(e) => {
                        if (e.key == 'Enter') LoginFunc(e);
                    }}
                ></input>
                <br></br>
                <input
                    type='password'
                    placeholder='password'
                    ref={password}
                    onKeyPress={(e) => {
                        if (e.key == 'Enter') LoginFunc(e);
                    }}
                ></input>
                <br></br>
                <button onClick={(e) => LoginFunc(e)}>Login</button>
                <Link href='/signup'>
                    <button>Sign Up</button>
                </Link>
                <INotice
                    text={loginSetting[0]}
                    color={loginSetting[1]}
                    isFlow={isFlow}
                    handleIsFlow={handleIsFlow}
                ></INotice>
            </div>
        </div>
    );
}

export default LogIn;

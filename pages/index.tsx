import classes from './index.module.css';
import {useRecoilState} from 'recoil';
import {useRef, useState, useEffect} from 'react';
import Link from 'next/link';
import {UserToken} from '../states/users';
import INotice from '../components/ui/INotice';
interface ISettings {
    text: string;
    color: string;
}
function LogIn(props) {
    const [token, setToken] = useRecoilState(UserToken);
    const [loginSetting, setLoginSetting] = useState<ISettings>({
        text: '',
        color: '',
    });
    const [isFlow, setIsFlow] = useState<boolean>(false);

    const id = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    async function auth(body) {
        let response = await fetch(
            process.env.NEXT_PUBLIC_DOMAIN + 'api/users/login/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            },
        );

        if (response.status === 200) {
            let response_json = await response.json();
            setToken(response_json.Token);
            setIsFlow(true);
            setLoginSetting({text: '로그인 성공', color: 'blue'});
        } else {
            setIsFlow(true);
            setLoginSetting({
                text: '로그인 실패 : ID 또는 PW 를 다시 확인해라 국노야ㅡㅡ',
                color: 'red',
            });
            return;
        }
    }

    const LoginFunc = (e) => {
        e.preventDefault();
        if (id.current!.value === '') {
            setIsFlow(true);
            setLoginSetting({
                text: '로그인 실패 : ID를 입력해라 국노야ㅡㅡ',
                color: 'red',
            });
            return;
        } else if (password.current!.value === '') {
            setIsFlow(true);
            setLoginSetting({
                text: '로그인 실패 : Password를 입력해라 국노야ㅡㅡ',
                color: 'red',
            });
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
        <>
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
                </div>
            </div>
            <INotice
                text={loginSetting.text}
                color={loginSetting.color}
                isFlow={isFlow}
                handleIsFlow={setIsFlow}
            ></INotice>
        </>
    );
}

export default LogIn;

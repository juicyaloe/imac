import classes from './index.module.css';
import {useRecoilState} from 'recoil';
import {useRef, useState, useEffect} from 'react';
import Link from 'next/link';
import {UserData} from '../states/users';
import {useRouter} from 'next/router';
import INotice from '../components/ui/INotice';

interface authBodyType {
    username: string;
    password: string;
}

// INotice Setting
interface ISettings {
    text: string;
    color: string;
}

function LogIn(props) {
    const router = useRouter();

    // 로그인 관리용
    const [userData, setUserData] = useRecoilState(UserData);

    // INotice용
    const [loginSetting, setLoginSetting] = useState<ISettings>({
        text: '',
        color: '',
    });
    const [isFlow, setIsFlow] = useState<boolean>(false);

    const id = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    async function auth(body: authBodyType) {
        let response = await fetch(
            process.env.NEXT_PUBLIC_DOMAIN + '/api/users/login/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            },
        );

        if (response.ok) {
            let response_json = await response.json();
            setUserData({
                ...userData,
                isLogin: true,
                username: body.username,
                token: response_json.Token,
            });

            // INotice
            setIsFlow(true);
            setLoginSetting({text: '로그인 성공', color: 'blue'});

            router.push('/main/');
        } else {
            setIsFlow(true);
            setLoginSetting({
                text: '로그인 실패 : ID 또는 PW 를 다시 확인해라 국노야ㅡㅡ',
                color: 'red',
            });
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
        } else if (password.current!.value === '') {
            setIsFlow(true);
            setLoginSetting({
                text: '로그인 실패 : Password를 입력해라 국노야ㅡㅡ',
                color: 'red',
            });
        } else {
            let body: authBodyType = {
                username: id.current?.value ?? '',
                password: password.current?.value ?? '',
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

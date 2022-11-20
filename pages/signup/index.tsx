import classes from './index.module.css';
import {useRecoilState} from 'recoil';
import {useRef, useState, useEffect} from 'react';
import Link from 'next/link';
import INotice from '../../components/ui/INotice';
interface ISettings {
    text: string;
    color: string;
}
function LogIn(props) {
    const [SignUpSetting, setSignUpSetting] = useState<ISettings>({
        text: '',
        color: '',
    });
    const [isFlow, setIsFlow] = useState<boolean>(false);

    const id = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);

    async function auth(body) {
        let response = await fetch(
            process.env.NEXT_PUBLIC_DOMAIN + '/api/users/register/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            },
        );

        if (response.status === 201) {
            let response_json = await response.json();
            setIsFlow(true);
            setSignUpSetting({text: '회원가입 성공', color: 'blue'});
        } else {
            setIsFlow(true);
            setSignUpSetting({
                text: '회원가입 실패',
                color: 'red',
            });
            return;
        }
    }

    const SignUpFunc = (e) => {
        e.preventDefault();
        if (id.current!.value === '') {
            setIsFlow(true);
            setSignUpSetting({
                text: '회원가입 실패 : ID를 입력해라 국노야ㅡㅡ',
                color: 'red',
            });
            return;
        } else if (password.current!.value === '') {
            setIsFlow(true);
            setSignUpSetting({
                text: '회원가입 실패 : Password를 입력해라 국노야ㅡㅡ',
                color: 'red',
            });
            return;
        } else if (email.current!.value === '') {
            setIsFlow(true);
            setSignUpSetting({
                text: '회원가입 실패 : email을 입력해라 국노야ㅡㅡ',
                color: 'red',
            });
        } else {
            let body = {
                username: id.current?.value,
                password: password.current?.value,
                email: email.current?.value,
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
                            if (e.key == 'Enter') SignUpFunc(e);
                        }}
                    ></input>
                    <br></br>
                    <input
                        type='password'
                        placeholder='password'
                        ref={password}
                        onKeyPress={(e) => {
                            if (e.key == 'Enter') SignUpFunc(e);
                        }}
                    ></input>
                    <input
                        type='email'
                        placeholder='email'
                        ref={email}
                        onKeyPress={(e) => {
                            if (e.key == 'Enter') SignUpFunc(e);
                        }}
                    ></input>
                    <br></br>
                    <button onClick={(e) => SignUpFunc(e)}>SignUp</button>
                    <Link href='/'>
                        <button>Log In</button>
                    </Link>
                </div>
            </div>
            <INotice
                text={SignUpSetting.text}
                color={SignUpSetting.color}
                isFlow={isFlow}
                handleIsFlow={setIsFlow}
            ></INotice>
        </>
    );
}

export default LogIn;

import classes from './index.module.css';
import {atom, useRecoilState} from 'recoil';
import {useState} from 'react';
import Link from 'next/link';

const UserToken = atom({
    key: 'token',
    default: '',
});

function LogIn(props) {
    const [token, setToken] = useRecoilState(UserToken);

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    async function auth(body) {
        let response = await fetch('http://52.78.87.49/api/users/login/', {
            method: 'POST',
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
                <input
                    type='text'
                    id='id'
                    placeholder='ID'
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                ></input>
                <br></br>
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

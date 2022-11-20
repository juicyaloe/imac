import {signIn, signOut, useSession} from 'next-auth/react';
import {Fragment} from 'react';

export default function Home() {
    const {data} = useSession();

    async function login() {
        const result = await signIn('credentials', {
            redirect: false,
            id: 'test',
            password: '123456',
        });

        if (result?.error) console.log('로그인 실패');
        else console.log(result, '로그인 성공');
    }

    function logout() {
        signOut();
    }
    return (
        <Fragment>
            <button onClick={login}>qwdqwdw</button>
            <button onClick={logout}>로그아웃</button>
            <button onClick={() => console.log(data?.user)}>qdw</button>
        </Fragment>
    );
}

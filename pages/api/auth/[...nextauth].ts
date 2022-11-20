import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

interface MyUser {
    Token: string;
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                id: {
                    label: '아이디',
                    type: 'text',
                    placeholder: '아이디를 입력하세요.',
                },
                password: {
                    label: '비밀번호',
                    type: 'password',
                    placeholder: '비밀번호를 입력하세요.',
                },
            },

            async authorize(credentials, req) {
                const {id, password} = credentials!;

                let response = await fetch(
                    process.env.NEXT_PUBLIC_DOMAIN + 'api/users/login/',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: id,
                            password: password,
                        }),
                    },
                );

                if (response.ok) {
                    let Token: string = await response.json();
                    return {id: id, Token: Token};
                } else {
                    throw new Error('로그인에 실패했습니다.');
                }
            },
        }),
    ],
    secret: 'test',
    pages: {
        signIn: '/',
    },
    callbacks: {
        async jwt({token, account, user}) {
            if (user) {
                console.log('account:', account.access_token);
            }
            return token;
        },
        async session({session, token}) {
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
});

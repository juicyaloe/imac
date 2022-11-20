import {atom} from 'recoil';

export interface UserObject {
    isLogin: boolean;
    username: string;
    token: string;
}

// 배포용
// export const UserData = atom<UserObject>({
//     key: 'UserData',
//     default: {
//         isLogin: false,
//         username: '',
//         token: '',
//     },
// });

// 개발용
export const UserData = atom<UserObject>({
    key: 'UserData',
    default: {
        isLogin: true,
        username: process.env.NEXT_PUBLIC_USER as string,
        token: process.env.NEXT_PUBLIC_TOKEN as string,
    },
});

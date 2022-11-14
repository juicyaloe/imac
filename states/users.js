import {atom} from 'recoil';

export const UserToken = atom({
    key: 'token',
    default: process.env.NEXT_PUBLIC_TOKEN,
});

export const UserName = atom({
    key: 'username',
    default: '',
});

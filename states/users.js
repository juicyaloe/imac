import {atom} from 'recoil';

export const UserToken = atom({
    key: 'token',
    default: process.env.NEXT_PUBLIC_TOKEN,
});

export const UserKey = atom({
    key: 'UserKey',
    default: {
        id: 2,
        username: 'test1',
    },
});

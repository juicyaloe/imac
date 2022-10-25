import {atom} from 'recoil';

export const UserToken = atom({
    key: 'token',
    default: '',
});

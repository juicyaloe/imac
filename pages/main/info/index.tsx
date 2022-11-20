import {Fragment} from 'react';
import {useRouter} from 'next/router';
import IList from '../../../components/ui/IList';
import {useQuery} from '@tanstack/react-query';
import {Group} from 'next/dist/shared/lib/router/utils/route-regex';

interface UserInfo {
    id: number;
    username: string;
    nickname: string;
    email: string;
    players: {id: number; name: string}[];
    selling: {id: number}[];
    buying: {id: number}[];
    budget: number;
    data_joined: string;
}

async function fetchMyInfo() {
    let response = await fetch(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/users/profiles/my/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ',
            },
            body: JSON.stringify({
                username: 'test1',
            }),
        },
    );
    console.log(response.status.toString());
    if (!response.ok) throw new Error(response.status.toString());
    return response.json();
}

export default function Info() {
    const {data, isLoading, isError, error} = useQuery<UserInfo, Error>(
        ['myinfo'],
        fetchMyInfo,
    );

    if (isLoading) return <div>qwdqwd</div>;
    if (isError) return <div>{typeof error.message}</div>;

    return <div>dqw</div>;
}

import {Fragment} from 'react';
import {useRouter} from 'next/router';
import IList from '../../../components/ui/IList';
import {useQuery} from '@tanstack/react-query';

async function fetchMyInfo() {
    let response = await fetch(
        process.env.NEXT_PUBLIC_DOMAIN + 'api/users/profiles/my/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + process.env.NEXT_PUBLIC_TOKEN,
            },
            body: JSON.stringify({
                username: 'test1',
            }),
        },
    );
    return response.json();
}

export default function Info() {
    const {data, isLoading, isError, error} = useQuery(['myinfo'], fetchMyInfo);

    if (isLoading) return <div>로딩중</div>;

    return <Fragment>{data.id}</Fragment>;
}

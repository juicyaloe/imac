import {Fragment} from 'react';
import {useRouter} from 'next/router';
import IList from '../../../components/ui/IList';
import {useQuery} from '@tanstack/react-query';
import {UserData, UserObject} from '../../../states/users';
import {Group} from 'next/dist/shared/lib/router/utils/route-regex';
import {useRecoilState} from 'recoil';
interface UserInfo {
    id: number;
    username: string;
    nickname: string;
    email: string;
    players: {id: number; name: string}[];
    selling: {id: number}[];
    buying: {id: number}[];
    budget: number;
    date_joined: string;
}

async function fetchMyInfo(userData: UserObject) {
    let response = await fetch(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/users/profiles/my/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + userData.token,
            },
            body: JSON.stringify({
                username: userData.username,
            }),
        },
    );
    console.log(response.status.toString());
    if (!response.ok) throw new Error(response.status.toString());
    return response.json();
}

export default function Info() {
    const [userData] = useRecoilState(UserData);
    console.log(userData);
    const {data, isLoading, isError, error} = useQuery<UserInfo, Error>(
        ['myinfo'],
        () => fetchMyInfo(userData),
    );

    if (isLoading) return <div>qwdqwd</div>;
    if (isError) return <div>{typeof error.message}</div>;

    return (
        <div>
            <ul>
                <li>내 아이디: {data.username}</li>
                <li>
                    내 선수들:
                    {data.players.map((player) => (
                        <div
                            key={player.id}
                            style={{border: '1px solid black'}}
                        >
                            선수 이름: {player.name}
                        </div>
                    ))}
                </li>
                <li>내 예산: {data.budget}</li>
                <li>가입 날짜: {new Date(data.date_joined).toString()}</li>
            </ul>
        </div>
    );
}

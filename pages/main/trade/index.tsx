import {Fragment, useEffect, useRef, useState, useCallback} from 'react';
import {useQuery} from '@tanstack/react-query';
import classes from './index.module.css';
import ISelect from '../../../components/ui/ISelect';

async function fetchUserData() {
    let response = await fetch(
        process.env.NEXT_PUBLIC_DOMAIN + 'api/users/profiles/',
        {
            headers: {
                Authorization: 'Token ' + process.env.NEXT_PUBLIC_TOKEN,
            },
        },
    );

    return response.json();
}

function TradeHome(props) {
    const [userID, setUserID] = useState<any>('');
    const [buyPlayersID, setBuyPlayersID] = useState<any>('');
    const [sellPlayersID, setSellPlayersID] = useState<any>('');

    const {data, isLoading} = useQuery(['user-data'], fetchUserData);

    if (isLoading) {
        return <div>데이터를 불러오는 중입니다.</div>;
    }

    async function postTrade(
        targetId: string,
        targetPlayer: string,
        myPlayer: string,
    ) {
        const tradeJson = {
            targetId: targetId,
            targetPlayer: targetPlayer,
            myPlayer: myPlayer,
        };
        console.log(parseInt(targetId) * parseInt(targetPlayer));
        console.log(targetId, targetPlayer, myPlayer);
    }

    function sellSubmitHandler(event) {
        event.preventDefault();

        const selectedUser = userID;
        // 전송
        console.log(buyPlayersID, sellPlayersID);
        for (let i = 0; i < buyPlayersID.length; i++)
            for (let j = 0; j < sellPlayersID.length; j++) {
                postTrade(selectedUser, buyPlayersID[i], sellPlayersID[j]);
            }
    }

    function handleOnChange_user(e) {
        console.log(e);
    }

    function handleOnChange_sell(e) {
        setSellPlayersID(
            [...e.target]
                .filter((option) => option.selected)
                .map((option) => option.value),
        );
    }

    return (
        <form
            className={classes.form}
            id='main-trade'
            onSubmit={sellSubmitHandler}
        >
            <div className={classes.controls}>
                <ISelect
                    value={data}
                    targetValue={'username'}
                    onChangeFunc={handleOnChange_user}
                ></ISelect>
                <button>거래 신청하기</button>
            </div>
        </form>
    );
}

export default TradeHome;

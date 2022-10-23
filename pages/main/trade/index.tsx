import {Fragment, useEffect, useRef, useState, useCallback} from 'react';
import classes from './index.module.css';

async function getUsersData() {
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
    const buyPlayerInputRef = useRef<HTMLSelectElement>(null);
    const sellPlayerInputRef = useRef<HTMLSelectElement>(null);

    const [usersData, setUsersData] = useState<any>();

    useEffect(() => {
        async function loadData() {
            let temp = await getUsersData();
            setUsersData(temp);
            setUserID(temp[0].id.toString());
        }

        loadData();
    }, []);

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
        const selectedBuyPlayer = buyPlayerInputRef.current!.value;
        const selectedSellPlayer = sellPlayerInputRef.current!.value;

        // 전송
        postTrade(selectedUser, selectedBuyPlayer, selectedSellPlayer);
    }

    return (
        <form
            className={classes.form}
            id='main-trade'
            onSubmit={sellSubmitHandler}
        >
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor='main-trade-user'>거래 대상 회원 선택</label>
                    <select
                        name='main-trade-user'
                        id='main-trade-user'
                        onChange={(e) => setUserID(e.target.value)}
                    >
                        {usersData?.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        )) ?? (
                            <option key={0} value={0}>
                                데이터를 불러오고 있습니다
                            </option>
                        )}
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='main-trade-buyplayer'>
                        구매할 선수 선택
                    </label>
                    <select
                        name='main-trade-buyplayer'
                        id='main-trade-buyplayer'
                        ref={buyPlayerInputRef}
                    >
                        {usersData?.map((user) => {
                            if (user.id == userID) {
                                if (user.players.length == 0) {
                                    return (
                                        <option key={0} value={0}>
                                            해당 회원은 보유 선수가 없습니다
                                        </option>
                                    );
                                }
                                return user.players?.map((player) => (
                                    <option key={player.id} value={player.id}>
                                        {player.name}
                                    </option>
                                ));
                            }
                        }) ?? (
                            <option key={0} value={0}>
                                데이터를 불러오고 있습니다
                            </option>
                        )}
                    </select>
                </div>
                <div className={`${classes.control} ${classes.lastcontrol}`}>
                    <label htmlFor='main-trade-sellplayer'>
                        판매할 선수 선택
                    </label>
                    <select
                        name='main-trade-sellplayer'
                        id='main-trade-sellplayer'
                        ref={sellPlayerInputRef}
                    >
                        <option value='1b'>1b 선수</option>
                        <option value='2b'>2b 선수</option>
                        <option value='3b'>3b 선수</option>
                    </select>
                </div>
                <button>거래 신청하기</button>
            </div>
        </form>
    );
}

export default TradeHome;

import {Fragment, useEffect, useRef, useState, useCallback} from 'react';
import classes from './index.module.css';

function TradeHome(props) {
    const userInputRef = useRef<HTMLSelectElement>(null);
    const buyPlayerInputRef = useRef<HTMLSelectElement>(null);
    const sellPlayerInputRef = useRef<HTMLSelectElement>(null);

    const [userData, setUserData] = useState<string[]>();
    const [playerData, setPlayerData] = useState<string[]>();

    useEffect(() => {
        async function loadData() {
            const userList = await fetchUserList();
            await fetchPlayerList(userList[0]);
        }

        loadData();
    }, []);

    async function fetchUserList() {
        return await fetch('/api/users')
            .then((response) => response.json())
            .then((json) => {
                setUserData(json.data);
                return json.data;
            });
    }

    async function fetchPlayerList(userId: string) {
        return await fetch('/api/players/' + userId)
            .then((response) => response.json())
            .then((json) => {
                setPlayerData(json.data);
                return json.data;
            });
    }

    function sellSubmitHandler(event) {
        event.preventDefault();

        const selectedUser = userInputRef.current?.value;
        const selectedBuyPlayer = buyPlayerInputRef.current?.value;
        const selectedSellPlayer = sellPlayerInputRef.current?.value;

        // 전송
        console.log(selectedUser, selectedBuyPlayer, selectedSellPlayer);
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
                        onChange={(e) => fetchPlayerList(e.target.value)}
                        ref={userInputRef}
                    >
                        {userData?.map((id) => (
                            <option key={id} value={id}>
                                {id}
                            </option>
                        )) ?? <option>회원 정보를 불러오는 중입니다</option>}
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
                        {playerData?.map((id) => (
                            <option key={id} value={id}>
                                {id}
                            </option>
                        )) ?? <option>선수 정보를 불러오는 중입니다</option>}
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

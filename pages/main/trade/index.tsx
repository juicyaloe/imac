import {Fragment, useEffect, useRef, useState, useCallback} from 'react';
import classes from './index.module.css';

type playerType = {
    id: string;
    player: string[];
};

function TradeHome(props) {
    const userInputRef = useRef<HTMLSelectElement>(null);
    const [currentUser, setCurrentUser] = useState<string>();

    const buyPlayerInputRef = useRef<HTMLSelectElement>(null);
    const sellPlayerInputRef = useRef<HTMLSelectElement>(null);

    const [userData, setUserData] = useState<string[]>();
    const [playerData, setPlayerData] = useState<playerType[]>();

    // 고쳤긴 한데 여전히 하드코딩 느낌이 있음
    // Ref, State 훅을 하나로 통일하는 것이 좋을듯 함
    useEffect(() => {
        console.log('db 정보 불러오기');
        fetch('/api/users')
            .then((response) => response.json())
            .then((json) => {
                setUserData(json.data);
                setCurrentUser(json.data[0]);
            });

        fetch('/api/players/')
            .then((response) => response.json())
            .then((json) => setPlayerData(json.data));
    }, []);

    function playerDataFiltering(playerData: playerType[] | undefined) {
        return playerData
            ?.find((profile) => profile.id === currentUser)
            ?.player.map((player) => (
                <option key={player} value={player}>
                    {player}
                </option>
            ));
    }

    function sellSubmitHandler(event) {
        event.preventDefault();

        const selectedUser = userInputRef.current?.value;
        const selectedBuyPlayer = buyPlayerInputRef.current?.value;
        const selectedSellPlayer = sellPlayerInputRef.current?.value;

        console.log(selectedUser, selectedBuyPlayer, selectedSellPlayer);
    }

    return (
        <Fragment>
            <form
                className={classes.form}
                id='trade'
                onSubmit={sellSubmitHandler}
            >
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor='trade-user'>거래 대상 회원 선택</label>
                        <select
                            name='trade-user'
                            id='trade-user'
                            onChange={(e) => setCurrentUser(e.target.value)}
                            ref={userInputRef}
                        >
                            {userData?.map((id) => (
                                <option key={id} value={id}>
                                    {id}
                                </option>
                            )) ?? (
                                <option>회원 정보를 불러오는 중입니다</option>
                            )}
                        </select>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='trade-buyplayer'>
                            구매할 선수 선택
                        </label>
                        <select
                            name='trade-buyplayer'
                            id='trade-buyplayer'
                            ref={buyPlayerInputRef}
                        >
                            {playerDataFiltering(playerData)}
                        </select>
                    </div>
                    <div
                        className={`${classes.control} ${classes.lastcontrol}`}
                    >
                        <label htmlFor='trade-sellplayer'>
                            판매할 선수 선택
                        </label>
                        <select
                            name='trade-sellplayer'
                            id='trade-sellplayer'
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
        </Fragment>
    );
}

export default TradeHome;

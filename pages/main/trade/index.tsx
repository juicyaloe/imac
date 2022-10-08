import {Fragment, useEffect, useRef, useState} from 'react';
import classes from './index.module.css';

type userData = {
    id: string;
};

type playerData = {
    id: string;
    player: string[];
};

function TradeHome(props) {
    const userInputRef = useRef<HTMLSelectElement>(null);
    const buyPlayerInputRef = useRef<HTMLSelectElement>(null);
    const sellPlayerInputRef = useRef<HTMLSelectElement>(null);

    const [userData, setUserData] = useState<userData[]>();
    const [playerData, setPlayerData] = useState<playerData[]>();

    useEffect(() => {
        fetch('/api/users')
            .then((response) => response.json())
            .then((data) => setUserData(data));
    });

    useEffect(() => {
        fetch('/api/player')
            .then((response) => response.json())
            .then((data) => setPlayerData(data));
    }, [userInputRef.current?.value]);

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
                            ref={userInputRef}
                        >
                            {userData?.map((data: userData) => (
                                <option key={data.id} value={data.id}>
                                    {data.id}
                                </option>
                            ))}
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
                            {playerData
                                ?.find(
                                    (data: playerData) =>
                                        data.id === userInputRef.current?.value,
                                )
                                ?.player.map((data) => (
                                    <option key={data} value={data}>
                                        {data}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className={classes.control}>
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

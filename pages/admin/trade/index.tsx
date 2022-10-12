import {Fragment, useRef, useEffect, useState} from 'react';
import classes from './index.module.css';

type tradeType = {
    targetId: string;
    targetPlayer: string;
    myPlayer: string;
};

export default function TradeAdmin() {
    const tradeListRef = useRef<HTMLSelectElement>(null);
    const [tradeList, setTradeList] = useState<tradeType[]>();

    useEffect(() => {
        async function loadData() {
            await fetchTradeList();
        }

        loadData();
    }, []);

    async function fetchTradeList() {
        await fetch('/api/trades')
            .then((response) => response.json())
            .then((json) => setTradeList(json.data));
    }

    function checkSubmitHandler(data: string) {
        const selectedTrade = tradeListRef.current?.value;
        if (data === 'accept') {
            console.log(selectedTrade, '수락');
        } else {
            console.log(selectedTrade, '거절');
        }
    }

    return (
        <form
            className={classes.form}
            id='admin-trade'
            onSubmit={(event) => event.preventDefault()}
        >
            <div className={classes.control}>
                <label htmlFor='admin-trade-list'>대기중인 거래 요청들</label>
                <select
                    name='admin-trade-list'
                    id='admin-trade-list'
                    ref={tradeListRef}
                    size={10}
                >
                    {tradeList?.map((data: tradeType, index) => (
                        <option key={index} value={data.myPlayer}>
                            {data.targetId}유저의 {data.targetPlayer}선수를{' '}
                            {data.myPlayer}선수와 교환
                        </option>
                    ))}
                </select>
            </div>
            <div className={classes.submit}>
                <button
                    onClick={() => {
                        checkSubmitHandler('accept');
                    }}
                >
                    수락하기
                </button>
                <button
                    onClick={() => {
                        checkSubmitHandler('denied');
                    }}
                >
                    거절하기
                </button>
            </div>
        </form>
    );
}

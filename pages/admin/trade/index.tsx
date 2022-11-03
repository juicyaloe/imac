import {Fragment, useRef, useEffect, useState} from 'react';
import classes from './index.module.css';
import {useQuery} from '@tanstack/react-query';

import {useRecoilState} from 'recoil';
import {testState} from '../../../states';

async function fetchTrades() {
    let response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + 'api/trades/', {
        headers: {
            Authorization: 'Token ' + process.env.NEXT_PUBLIC_TOKEN,
        },
    });
    return response.json();
}

export default function TradeAdmin() {
    const [testData, setTestData] = useRecoilState(testState);

    const tradeListRef = useRef<HTMLSelectElement>(null);
    const [tradeList, setTradeList] = useState<any[]>();

    const {data, isLoading} = useQuery(['trades'], fetchTrades);
    if (!isLoading) console.log(data);

    useEffect(() => {
        async function loadData() {
            let tradeList = await fetchTrades();
            setTradeList(tradeList);
        }

        loadData();
    }, []);

    function checkSubmitHandler(isAccpted: boolean) {
        const selectedTrade = tradeListRef.current?.value;
        if (isAccpted) {
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
            <div>{testData}</div>
            <div className={classes.control}>
                <label htmlFor='admin-trade-list'>대기중인 거래 요청들</label>
                <select
                    name='admin-trade-list'
                    id='admin-trade-list'
                    ref={tradeListRef}
                    size={20}
                >
                    {tradeList?.map((data) => (
                        <option key={data.id} value={data.id}>
                            [{data.seller}]의 [{data.targetPlayer}] 선수를 [
                            {data.buyer}]에게 판매하는 거래
                        </option>
                    ))}
                </select>
            </div>
            <div className={classes.submit}>
                <button
                    onClick={() => {
                        checkSubmitHandler(true);
                    }}
                >
                    수락하기
                </button>
                <button
                    onClick={() => {
                        checkSubmitHandler(false);
                    }}
                >
                    거절하기
                </button>
            </div>
        </form>
    );
}

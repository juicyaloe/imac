import {Fragment, useRef} from 'react';
import classes from './index.module.css';

export default function TradeAdmin() {
    const tradeListRef = useRef<HTMLSelectElement>(null);

    function checkSubmitHandler(data: string) {
        if (data === 'accept') {
            const selectedTrade = tradeListRef.current?.value;
            console.log(selectedTrade, '수락');
        } else {
            const selectedTrade = tradeListRef.current?.value;
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
                    <option value='a'>a</option>
                    <option value='b'>b</option>
                    <option value='c'>c</option>
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

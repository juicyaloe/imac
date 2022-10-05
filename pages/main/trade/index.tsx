/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

import {Fragment, useRef} from 'react';

function TradeHome(props) {
    const userInputRef = useRef<HTMLSelectElement>(null);
    const buyPlayerInputRef = useRef<HTMLSelectElement>(null);
    const sellPlayerInputRef = useRef<HTMLSelectElement>(null);

    function sellSubmitHandler(event) {
        event.preventDefault();

        const selectedUser = userInputRef.current?.value;
        const selectedBuyPlayer = buyPlayerInputRef.current?.value;
        const selectedSellPlayer = sellPlayerInputRef.current?.value;

        console.log(selectedUser, selectedBuyPlayer, selectedSellPlayer);
    }

    return (
        <Fragment>
            <form id='trade' onSubmit={sellSubmitHandler}>
                <div>
                    <div>
                        <label htmlFor='trade-user'>거래 대상 회원 선택</label>
                        <select
                            name='trade-user'
                            id='trade-user'
                            ref={userInputRef}
                        >
                            <option value='a'>a 유저</option>
                            <option value='b'>b 유저</option>
                            <option value='c'>c 유저</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='trade-buyplayer'>
                            구매할 선수 선택
                        </label>
                        <select
                            name='trade-buyplayer'
                            id='trade-buyplayer'
                            ref={buyPlayerInputRef}
                        >
                            <option value='1a'>1a 선수</option>
                            <option value='2a'>2a 선수</option>
                            <option value='3a'>3a 선수</option>
                        </select>
                    </div>
                    <div>
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

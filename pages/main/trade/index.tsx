import {
    Fragment,
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
} from 'react';
import {useQuery} from '@tanstack/react-query';
import classes from './index.module.css';
import ISelect from '../../../components/ui/ISelect';
import * as R from 'ramda';

import {useRecoilState} from 'recoil';
import {UserKey} from '../../../states/users';

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

const compUser = (username: string) => (data) => data.username == username;

const getPlayers = (username: string) =>
    R.pipe(R.filter(compUser(username)), R.map(R.prop('players')), R.unnest);

function TradeHome(props) {
    const [key] = useRecoilState(UserKey);

    const [userID, setUserID] = useState<any | undefined>(undefined);
    const [buyPlayersID, setBuyPlayersID] = useState<any[] | undefined>(
        undefined,
    );
    const [sellPlayersID, setSellPlayersID] = useState<any[] | undefined>(
        undefined,
    );

    const {data, isLoading} = useQuery(['user-data'], fetchUserData);
    const [selectedPlayers, setSelectedPlayers] = useState<any>(undefined);
    const [myPlayers, setMyPlayers] = useState<any>(undefined);

    async function postTrade(
        targetId: number,
        targetPlayer: number[],
        myPlayer: number[],
    ) {
        const tradeJson = {
            targetId: targetId,
            targetPlayer: targetPlayer,
            myPlayer: myPlayer,
        };
    }

    function sellSubmitHandler(event) {
        event.preventDefault();

        console.log(userID, 'USERID');
        console.log(buyPlayersID, 'buyPlayersID');
        console.log(sellPlayersID, 'sellPlayersID');

        // const selectedUser = userID;
        // // 전송
        // console.log(buyPlayersID, sellPlayersID);
        // for (let i = 0; i < buyPlayersID.length; i++)
        //     for (let j = 0; j < sellPlayersID.length; j++) {
        //         postTrade(selectedUser, buyPlayersID[i], sellPlayersID[j]);
        //     }
    }

    function onChangeUser(selectedID) {
        setUserID(selectedID);
        setSelectedPlayers([...getPlayers(selectedID)(data)]);
        setMyPlayers([...getPlayers(key.username)(data)]);
        setBuyPlayersID([]);
        setSellPlayersID([]);
    }

    function onChangeBuyPlayer(selectedID: any[]) {
        setBuyPlayersID([...selectedID]);
    }

    function onChangeSellPlayer(selectedID: any[]) {
        setSellPlayersID([...selectedID]);
    }

    return (
        <form
            className={classes.form}
            id='main-trade'
            onSubmit={sellSubmitHandler}
        >
            <div className={classes.controls}>
                {!isLoading ? (
                    <ISelect
                        id='main-trade-user'
                        text='거래 대상 회원 선택'
                        target={data.filter(
                            (data) => data.username != key.username,
                        )}
                        keyPropName={'username'}
                        dataPropName={'username'}
                        onChangeFunc={onChangeUser}
                    ></ISelect>
                ) : (
                    <div>회원 정보를 불러오고 있습니다.</div>
                )}
                {selectedPlayers ? (
                    <ISelect
                        id='main-trade-buyplayer'
                        text='구매할 선수 선택'
                        target={selectedPlayers}
                        keyPropName={'id'}
                        dataPropName={'name'}
                        onChangeFunc={onChangeBuyPlayer}
                        multiple
                    ></ISelect>
                ) : (
                    <div>선수 정보를 불러오고 있습니다.</div>
                )}
                {myPlayers ? (
                    <ISelect
                        id='main-trade-sellplayer'
                        text='판매할 선수 선택'
                        target={myPlayers}
                        keyPropName={'id'}
                        dataPropName={'name'}
                        onChangeFunc={onChangeSellPlayer}
                        multiple
                    ></ISelect>
                ) : (
                    <div>내 선수 정보를 불러오고 있습니다.</div>
                )}
                <button>거래 신청하기</button>
            </div>
        </form>
    );
}

export default TradeHome;

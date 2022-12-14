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
import {UserData} from '../../../states/users';

async function fetchUserData() {
    let response = await fetch(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/users/profiles/',
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
    const [userData] = useRecoilState(UserData);

    const [userID, setUserID] = useState<string | undefined>(undefined);
    const [buyPlayersID, setBuyPlayersID] = useState<number[] | undefined>(
        undefined,
    );
    const [sellPlayersID, setSellPlayersID] = useState<number[] | undefined>(
        undefined,
    );

    const {data, isLoading} = useQuery(['user-data'], fetchUserData);
    const [selectedPlayers, setSelectedPlayers] = useState<any>(undefined);
    const [myPlayers, setMyPlayers] = useState<any>(undefined);

    useEffect(() => {
        if (data) {
            setMyPlayers([...getPlayers(userData.username)(data)]);
        }
        // eslint-disable-next-line
    }, [userData]);

    async function postTrade(
        targetUser: string,
        targetPlayer: number[],
        myPlayer: number[],
    ) {
        const tradeJson = {
            targetUser: targetUser,
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
        // // ??????
        // console.log(buyPlayersID, sellPlayersID);
        // for (let i = 0; i < buyPlayersID.length; i++)
        //     for (let j = 0; j < sellPlayersID.length; j++) {
        //         postTrade(selectedUser, buyPlayersID[i], sellPlayersID[j]);
        //     }
    }

    function onChangeUser(selectedID) {
        setUserID(selectedID as string);

        setSelectedPlayers([...getPlayers(selectedID)(data)]);
        setMyPlayers([...getPlayers(userData.username)(data)]);

        setBuyPlayersID([]);
        setSellPlayersID([]);
    }

    function onChangeBuyPlayer(selectedID: any[]) {
        setBuyPlayersID([...selectedID] as number[]);
    }

    function onChangeSellPlayer(selectedID: any[]) {
        setSellPlayersID([...selectedID] as number[]);
    }

    return (
        <form
            className={classes.form}
            id='main-trade'
            onSubmit={sellSubmitHandler}
        >
            {userData.username != '' ? (
                <div>?????? ??????: {userData.username}(???)??? ?????????</div>
            ) : (
                <div>?????? ??????: ????????????</div>
            )}
            <div className={classes.controls}>
                {!isLoading ? (
                    <ISelect
                        id='main-trade-user'
                        text='?????? ?????? ?????? ??????'
                        target={data.filter(
                            (data) => data.username != userData.username,
                        )}
                        keyPropName={'username'}
                        dataPropName={'username'}
                        onChangeFunc={onChangeUser}
                    ></ISelect>
                ) : (
                    <div>?????? ????????? ???????????? ????????????.</div>
                )}
                {selectedPlayers ? (
                    <ISelect
                        id='main-trade-buyplayer'
                        text='????????? ?????? ??????'
                        target={selectedPlayers}
                        keyPropName={'id'}
                        dataPropName={'name'}
                        onChangeFunc={onChangeBuyPlayer}
                        multiple
                    ></ISelect>
                ) : (
                    <div>?????? ????????? ???????????? ????????????.</div>
                )}
                {myPlayers ? (
                    <ISelect
                        id='main-trade-sellplayer'
                        text='????????? ?????? ??????'
                        target={myPlayers}
                        keyPropName={'id'}
                        dataPropName={'name'}
                        onChangeFunc={onChangeSellPlayer}
                        multiple
                    ></ISelect>
                ) : (
                    <div>??? ?????? ????????? ???????????? ????????????.</div>
                )}
                <button>?????? ????????????</button>
            </div>
        </form>
    );
}

export default TradeHome;

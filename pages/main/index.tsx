import {Fragment} from 'react';
import Image from 'next/image';
import classes from './index.module.css';

const testJson = [
    {
        id: '1',
        name: 'Mincheol Lee',
        school: 'ChungNam National University , Andong High School',
        avg: '.991',
        hr: '54',
        rbi: '073',
    },
];

export default function MainA() {
    return (
        <div className={classes.background}>
            <div className={classes.card}>
                <div className={classes.cardTopbar}>
                    <div className={classes.cardTopbarText}>마구야구야구</div>
                    <button onClick={() => alert('내 정보')}>내 정보</button>
                    <button onClick={() => alert('경매장')}>경매장</button>
                    <div className={classes.cardTopbarMenu}>
                        <Image
                            width='30px'
                            height='30px'
                            src='/main_menu_icon.png'
                            alt=''
                            onClick={() => alert('CLICK MENU')}
                        ></Image>
                    </div>
                </div>
                <div>
                    {testJson.map((user) => (
                        <div className={classes.content} key={user.id}>
                            <div className={classes.infoName}>{user.name}</div>
                            <div className={classes.infoSchool}>
                                {user.school}
                            </div>
                            <div className={classes.info}>
                                {user.avg}
                                <div className={classes.infoTag}>
                                    Batting Average
                                </div>
                            </div>
                            <div className={classes.info}>
                                {user.hr}
                                <div className={classes.infoTag}>Homeruns</div>
                            </div>
                            <div className={classes.info}>
                                {user.rbi}
                                <div className={classes.infoTag}>
                                    Runs Batted In
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import Image from 'next/image';
import classes from './index.module.css';
import testJson from '../../public/userTestData.json';

function userInfo() {
    return (
        <div>
            {testJson.map((user) => (
                <div className={classes.content} key={user.id}>
                    <div className={classes.infoName}>{user.name}</div>
                    <div className={classes.infoSchool}>{user.school}</div>
                    <div className={classes.info}>
                        {user.avg}
                        <div className={classes.infoTag}>Batting Average</div>
                    </div>
                    <div className={classes.info}>
                        {user.hr}
                        <div className={classes.infoTag}>Homeruns</div>
                    </div>
                    <div className={classes.info}>
                        {user.rbi}
                        <div className={classes.infoTag}>Runs Batted In</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Main() {
    return (
        <body className={classes.background}>
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
                <div> {userInfo()} </div>
            </div>
        </body>
    );
}

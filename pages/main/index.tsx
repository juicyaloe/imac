import React from 'react';
import Image from 'next/image';
import classes from './index.module.css';
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
            </div>
        </body>
    );
}

import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {Fragment} from 'react';

import {useRecoilState} from 'recoil';
import {testState} from '../states';
import Link from 'next/link';

const Home: NextPage = () => {
    const [testData, setTestData] = useRecoilState(testState);

    return (
        <Fragment>
            <div>{testData}</div>
            <button
                onClick={() => {
                    console.log('클릭');
                    setTestData(5);
                }}
            ></button>
            <Link href='/admin/trade'>
                <button></button>
            </Link>
        </Fragment>
    );
};

export default Home;

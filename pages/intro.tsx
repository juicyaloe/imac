import {useEffect, useRef, useState} from 'react';
import classes from './intro.module.css';

export default function Intro() {
    const [test, setTest] = useState<any>();

    useEffect(() => {
        let observer;
        if (test) {
            observer = new IntersectionObserver((e) => {
                e.forEach((data: any) => {
                    if (data.isIntersecting) {
                        data.target.style.opacity = 1;
                    } else {
                        data.target.style.opacity = 0;
                    }
                });
            });
            observer.observe(test);
        }
    }, [test]);

    return (
        <>
            <div className={classes.test} ref={setTest}>
                안녕하세요
            </div>
            <div className={classes.test}>ㅋㅋㅋㅋ</div>
            <div className={classes.test}>신기하네요</div>
        </>
    );
}

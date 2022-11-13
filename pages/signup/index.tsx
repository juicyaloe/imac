import IChoice, {buttonOption} from '../../components/ui/IChoice';

import IList from '../../components/ui/IList';

import {Fragment, useState, useEffect} from 'react';

function SignUp(props) {
    const [message, messageFunc] = useState<buttonOption[] | undefined>(
        undefined,
    );

    useEffect(() => {
        if (message) {
            // 메시지 처리
        }
    }, [message]);

    const [isShow, setIsShow] = useState<boolean>(false);

    return (
        <Fragment>
            <button onClick={() => setIsShow(true)}>창 띄우기</button>
            {isShow ? (
                <IChoice
                    btnSet={[
                        {text: '수락', option: ['yes', 'close']},
                        {text: '거절', option: ['no', 'close']},
                        {text: '기타', option: [5, 'close']},
                    ]}
                    messageFunc={messageFunc}
                >
                    <IList list={['안녕', '큭큭', '반갑다']}></IList>
                </IChoice>
            ) : (
                <div>안 보이는 상태</div>
            )}
        </Fragment>
    );
}

export default SignUp;

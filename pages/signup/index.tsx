import IChoice, {buttonOption} from '../../components/ui/IChoice';

import IList from '../../components/ui/IList';

import {Fragment, useState, useEffect} from 'react';

function SignUp(props) {
    const [message, messageFunc] = useState<buttonOption[] | undefined>(
        undefined,
    );
    const [isShow, setIsShow] = useState<boolean>(false);

    useEffect(() => {
        message?.forEach((option) => {
            switch (option) {
                case 'yes':
                    console.log('수락 버튼을 눌렸습니다.');
                    break;
                case 'no':
                    console.log('거절 버튼을 눌렸습니다.');
                    break;
                case 5:
                    console.log('5 전송했습니다.');
                    break;
                case 'close':
                    console.log('창을 닫았습니다.');
                    setIsShow(false);
                    break;
            }
        });
    }, [message]);

    return (
        <Fragment>
            <button onClick={() => setIsShow(true)}>창 띄우기</button>
            {isShow ? (
                <IChoice
                    btnSet={[
                        {text: '수락', option: ['yes', 'close']},
                        {text: '거절', option: ['no', 'close']},
                        {text: '5', option: [5]},
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

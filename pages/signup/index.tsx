import IChoice from '../../components/ui/IChoice';
import IList from '../../components/ui/IList';
import {useState} from 'react';

interface BtnSet {
    name: string;
    Fnc: (...any) => void;
    value: any[];
}
function SignUp(props) {
    const [isFlow, setIsFlow] = useState<boolean>(false);
    const [value, setValue] = useState<boolean>(true);

    const btnSet: BtnSet[] = [
        {name: '수락', Fnc: setValue, value: [true]},
        {name: '거절', Fnc: setValue, value: [false]},
    ];

    return (
        <>
            <button onClick={(e) => setIsFlow(true)}>make IChoice</button>
            <IChoice
                width='40rem'
                height='40rem'
                title='제목'
                isFlow={isFlow}
                handleIsFlow={setIsFlow}
                Btn={btnSet}
            >
                <IList list={['asdf', 'asdgasg', 'gagadgad']}></IList>
            </IChoice>
            <div>isFlow : {isFlow ? 'true' : 'false'}</div>
            <div>value : {value ? 'true' : 'false'}</div>
        </>
    );
}

export default SignUp;

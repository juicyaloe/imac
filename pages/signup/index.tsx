import IChoice from '../../components/ui/IChoice';
import IList from '../../components/ui/IList';
import {useState} from 'react';
function SignUp(props) {
    const [bol, setBol] = useState<boolean>(true);
    return (
        <>
            <IChoice width='20rem' onClickBtn={setBol} title='Tilte'>
                <IList list={['asdf', 'asdgasg', 'gagadgad', 'a']}></IList>
            </IChoice>
            <div>{bol ? 'true' : 'false'}</div>
        </>
    );
}

export default SignUp;

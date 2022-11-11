import IChoice from '../../components/ui/IChoice';
import IList from '../../components/ui/IList';
import {Fragment, useState} from 'react';

function SignUp(props) {
    return (
        <Fragment>
            <IChoice
                size={{width: '40rem', height: '40rem'}}
                title='알림 창입니다'
            >
                <IList list={['asdf', 'asdgasg', 'gagadgad']}></IList>
            </IChoice>
        </Fragment>
    );
}

export default SignUp;

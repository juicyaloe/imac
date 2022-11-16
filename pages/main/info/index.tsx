import {Fragment} from 'react';
import {useRouter} from 'next/router';
import IList from '../../../components/ui/IList';

export default function Info() {
    const router = useRouter();

    return (
        <Fragment>
            <IList list={['123', '45', '이민철']}></IList>
        </Fragment>
    );
}

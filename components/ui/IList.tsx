import {Fragment} from 'react';

interface Prop {
    list: string[];
}

export default function IList({list}: Prop) {
    return (
        <Fragment>
            {list.map((data, index) => (
                <div key={index}>{data}</div>
            ))}
        </Fragment>
    );
}

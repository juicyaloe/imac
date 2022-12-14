import * as R from 'ramda';
import {useEffect, useState} from 'react';
import classes from './ISelect.module.css';

type Props = {
    readonly id: string;
    readonly text: string;

    readonly target: any[];
    readonly keyPropName: string;
    readonly dataPropName: string;

    readonly onChangeFunc: (any) => void;

    readonly multiple?: boolean;
};

export default function ISelect({
    id,
    text,
    target = [],
    keyPropName,
    dataPropName,
    onChangeFunc,
    multiple = false,
}: Props) {
    const [selectedList, setSelectedList] = useState<any[]>([...target]);

    useEffect(() => {
        console.log('initialize', id);
        multiple
            ? onChangeFunc([] as any[])
            : onChangeFunc(target[0][keyPropName]);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // for multiple
        console.log('multiple initialize', id);
        let temp = [...target];
        temp.forEach((data) => (data.isSelected = false));
        setSelectedList(temp);
        // eslint-disable-next-line
    }, [target]);

    function changeSelectedList(selectedKey) {
        let temp = [...selectedList];
        temp.filter((data) => data[keyPropName] == selectedKey).forEach(
            (data) => (data.isSelected = !data.isSelected),
        );
        setSelectedList(temp);
        onChangeFunc(
            temp
                .filter((data) => data.isSelected)
                .map((data) => data[keyPropName]),
        );
    }

    if (!multiple) {
        return (
            <div className={classes.control}>
                <label htmlFor={id}>{text}</label>
                <select
                    name={id}
                    id={id}
                    onChange={(e) => onChangeFunc(e.target.value)}
                >
                    {selectedList.map((data) => (
                        <option
                            key={data[keyPropName]}
                            value={data[keyPropName]}
                        >
                            {data[dataPropName]}
                        </option>
                    ))}
                </select>
            </div>
        );
    } else {
        if (selectedList.length == 0) {
            return (
                <div className={classes.control}>
                    <label htmlFor={id}>{text}</label>
                    <div id={id} className={classes.no_data}>
                        ???????????? ????????????
                    </div>
                </div>
            );
        }

        return (
            <div className={classes.control}>
                <label htmlFor={id}>{text}</label>
                <div id={id} className={classes.multiple_box}>
                    {selectedList.map((data) => (
                        <div
                            key={data[keyPropName]}
                            data-value={data[keyPropName]}
                            className={`${
                                data.isSelected ? classes.clicked : ''
                            }`}
                            onClick={(e: any) =>
                                changeSelectedList(e.target.dataset.value)
                            }
                        >
                            &nbsp;{data[dataPropName]}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

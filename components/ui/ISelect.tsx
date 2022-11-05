import * as R from 'ramda';
import {useEffect, useState} from 'react';
import classes from './ISelect.module.css';

type Props = {
    id: string;
    explainText: string;
    value: any[];
    targetValue: string;
    onChangeFunc: (any) => void;
    multiple?: boolean;
};

const filter_func = (targetValue: string) =>
    R.pipe(R.project(['id', targetValue]), R.flatten);

export default function ISelect({
    id,
    explainText,
    value,
    targetValue,
    onChangeFunc,
    multiple = false,
}: Props) {
    // data 추출
    let dataList: any[] = filter_func(targetValue)(value);
    onChangeFunc(Number(dataList[0].id));

    // multiple 전용 변수
    const [selectedList, setSelectedList] = useState<any>([]);

    useEffect(() => {
        let temp = [...dataList];
        temp.forEach((data) => (data.isSelected = false));
        setSelectedList(temp);
    }, []);

    if (!multiple) {
        return (
            <div className={classes.control}>
                <label htmlFor={id}>{explainText}</label>
                <select
                    name={id}
                    id={id}
                    onChange={(e) => onChangeFunc(Number(e.target.value))}
                >
                    {dataList.map((data) => (
                        <option key={data.id} value={data.id}>
                            {data[targetValue]}
                        </option>
                    ))}
                </select>
            </div>
        );
    } else {
        console.log('현재 상태', selectedList);

        return (
            <div className={classes.control}>
                <label htmlFor={id}>{explainText}</label>
                <div id={id} className={classes.multiple_box}>
                    {selectedList.map((data) => (
                        <div
                            key={data.id}
                            className={`${
                                data.isSelected ? classes.clicked : ''
                            }`}
                            data-id={data.id}
                            onClick={(e: any) => {
                                let temp = [...selectedList];
                                temp.filter(
                                    (data) => data.id == e.target.dataset.id,
                                ).forEach(
                                    (data) =>
                                        (data.isSelected = !data.isSelected),
                                );
                                setSelectedList(temp);
                            }}
                        >
                            {data[targetValue]}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

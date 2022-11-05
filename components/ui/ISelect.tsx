import * as R from 'ramda';

type Props = {
    value: any[];
    targetValue: string;
    onChangeFunc: (any) => void;
    multiple?: boolean;
};

const filter_func = (targetValue: string) =>
    R.pipe(
        R.project(['id', targetValue]),
        R.flatten,
        R.tap((e) => console.log(e)),
    );

export default function ISelect({
    value,
    targetValue,
    onChangeFunc,
    multiple = false,
}: Props) {
    let dataList = filter_func(targetValue)(value);

    if (!multiple) {
        return (
            <select
                name='main-trade-user'
                id='main-trade-user'
                onChange={(e) => onChangeFunc(e.target.value)}
            >
                {dataList.map((data: any) => (
                    <option key={data.id}>{data[targetValue]}</option>
                ))}
            </select>
        );
    }

    return (
        <div>
            {dataList.map((data: any) => (
                <div key={data.id}>{data[targetValue]}</div>
            ))}
        </div>
    );
}

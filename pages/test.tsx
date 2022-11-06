import ISelect from '../components/ui/ISelect';

export default function Test() {
    function onChangeFunc(e) {
        console.log(e);
    }

    return (
        <div>
            <ISelect
                id={'test1'}
                text={'테스트입니다'}
                target={[
                    {id: 1, name: '안녕'},
                    {id: 2, name: '큭큭'},
                    {id: 3, name: '테스트'},
                ]}
                keyPropName={'id'}
                dataPropName={'name'}
                onChangeFunc={onChangeFunc}
                multiple
            />
        </div>
    );
}

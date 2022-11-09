interface Prop {
    list: string[]
}

export default function IList({list}: Prop) {
    return <div>{list.map((data, index) => <div key={index}>{data}</div>)}</div>
}
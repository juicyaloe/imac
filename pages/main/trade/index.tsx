function TradeHome(props) {
    return (
        <div>
            <label htmlFor='user-list'>이름</label>
            <select name='user-list' id='user-list'>
                <option value='A'>A 유저</option>
                <option value='B'>B 유저</option>
                <option value='C'>C 유저</option>
            </select>
        </div>
    );
}

export default TradeHome;

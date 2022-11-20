import styled from '@emotion/styled';
import {useRecoilState} from 'recoil';
import {UserData} from '../../states/users';
import {useRouter} from 'next/router';

const StyledBar = styled.div`
    background-color: #d1ffc0;
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
`;

const StyledText = styled.div`
    display: inline-block;
    margin: 0 10px;
    padding: 5px 25px;
    border: 1px solid black;
    border-radius: 7px;
    &:hover,
    &:active {
        background-color: white;
    }
`;

export default function Navbar() {
    const router = useRouter();
    const [userData, setUserData] = useRecoilState(UserData);

    return (
        <StyledBar>
            <StyledText onClick={() => router.push('/main/')}>홈</StyledText>
            <StyledText
                onClick={() => {
                    setUserData({isLogin: false, username: '', token: ''});
                    router.push('/');
                }}
            >
                로그아웃
            </StyledText>
            <StyledText onClick={() => router.push('/main/trade/')}>
                거래하기
            </StyledText>
        </StyledBar>
    );
}

import styled from 'styled-components';

export const YourScore = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`
export const BestWeekScore = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
        img{
            height:55px;
            border-radius:50px;
            margin-right:10px;
        }
`
export const AllScore = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

export const BackToMenu = styled.div`
    margin: 0 auto;
    width: 120px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e65d56;
    border-radius:5px;
    color:white;
    font-size:16px;
        
        :hover{
            background: rgba(230,93,86, 0.7)
        }
`
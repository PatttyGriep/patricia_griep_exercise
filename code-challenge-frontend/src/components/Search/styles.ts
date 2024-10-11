import styled from 'styled-components';

export const SearchContainer = styled.div`
    position: relative;
    display: flex;
    width:98.6%;
    padding:10px 0px 10px 25px;
    background-color: #0086c2;
`;

export const InputContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 20%;

     @media (max-width: 1440px) {
        width: 30%;
    }

    @media (max-width: 1024px) {
        width: 40%;
    }

    @media (max-width: 768px) {
        width: 50%;
    }

    @media (max-width: 425px) {
        width: 90%;
    }
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 10px 50px 10px 35px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const SearchIcon = styled.span`
    position: absolute;
    font-size: 16px;
    color: #999;
    margin-left: 5px;
`;

export const ClearButton = styled.button`
    position: absolute;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #999;
    &:hover {
        color: #333;
    }
`;

import styled from 'styled-components';

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100%;
    margin-bottom:20px;

    @media (max-width: 425px) {
        width:100%;
    }
    
`;

export const NavigationHeader = styled.div`
    display: flex;
    align-items: center;
    width: 98.6%;
    background-color: #0078ae;
    height:35px;
    padding: 1rem  1.5rem 1rem 0;


    @media (max-width: 425px) {
        height:auto;
    }
    
`;

export const BackButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    margin-left:0.8rem;
`;

export const Title = styled.h1`
    margin: 0;
    font-size: 1.5rem;
    color:#fff;
    width:50%;
    text-align: center!important;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 425px) {
        width:80%;
    }
    
`;


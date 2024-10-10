import styled from 'styled-components';

export const Container = styled.div<{hasNavigation: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    justify-content: left;
    border-radius: 5px;
    background: #fff;
    padding: 10px;
    min-width: 340px;
    max-height: 200px;
    cursor: ${props => (props.hasNavigation ? 'pointer' : 'default')};
    margin: 5px;
    line-height: 25px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

export const Tag = styled.div`
    padding: 0px 10px;
    background-color: #70d25f;
    border-radius: 12px;
    font-size: 0.9em;
    color: #fff;
    margin-bottom: 10px;
    font-family: arial;
    font-size:15px;
    font-weight:bold
`;

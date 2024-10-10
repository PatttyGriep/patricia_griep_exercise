import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {HeaderContainer, NavigationHeader, BackButton, Title} from './styles';
import Search from '../Search';

interface Props {
    title: string;
    showBackButton?: boolean;
    onSearch?: (searchTerm: string) => void;
    showSearch?: boolean;
}

const Header = ({title, showBackButton = true, onSearch, showSearch = true}: Props) => {
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <NavigationHeader>
                {showBackButton && (
                    <BackButton
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#fff" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </svg>
                    </BackButton>
                )}
                <Title>{title}</Title>
                
            </NavigationHeader>
            {showSearch && onSearch && (
                <Search onSearch={onSearch} />
            )}
        </HeaderContainer>
    );
};

export default Header;

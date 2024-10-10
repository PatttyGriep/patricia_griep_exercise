import * as React from 'react';
import {SearchContainer, SearchInput, SearchIcon, ClearButton, InputContainer} from './styles';

interface Props {
    onSearch: (searchTerm: string) => void;
}

const Search = ({onSearch}: Props) => {
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value; // Definindo a variável value corretamente
        setSearchTerm(value);
        onSearch(value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <SearchContainer>
            <InputContainer>
                <SearchIcon>🔍</SearchIcon>
                <SearchInput
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                {searchTerm && (
                    <ClearButton onClick={clearSearch}>
                        ✖
                    </ClearButton>
                )}
            </InputContainer>
        </SearchContainer>
    );
};

export default Search;

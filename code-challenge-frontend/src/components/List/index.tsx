import * as React from 'react';
import {ListItem} from 'types';
import Card from '../Card';
import {Spinner} from '../Spinner';
import {Container} from './styles';

interface Props {
    items?: ListItem[];
    hasNavigation?: boolean;
    isLoading: boolean;
}

const List = ({items, hasNavigation = true, isLoading}: Props) => {
    const renderItems = () => {
        return items.map(({url, id, columns, navigationProps}, index) => (
            <Card
                key={`${id}-${index}`}
                id={id}
                columns={columns}
                navigationProps={navigationProps}
                hasNavigation={hasNavigation}
                url={url}
            />
        ));
    };

    return (
        <Container>
            {isLoading && <Spinner />}
            {!isLoading && renderItems()}
        </Container>
    );
};

export default List;

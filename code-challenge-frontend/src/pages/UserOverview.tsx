import * as React from 'react';
import {useLocation} from 'react-router-dom';
import {UserData} from 'types';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';

const mapUserDataToCard = (user: UserData) => {
    const columns = [
        {key: 'Name', value: `${user.firstName} ${user.lastName}`},
        {key: 'Display Name', value: user.displayName},
        {key: 'Location', value: user.location},
    ];
    return <Card columns={columns} hasNavigation={false} navigationProps={user} />;
};

const UserOverview = () => {
    const location = useLocation();
    const user = location.state as UserData;

    if (!user) {
        return <div>Error: User data not found</div>;
    }

    return (
        <Container>
            <Header
                title={`User ${user.firstName} ${user.lastName}`}
                showSearch={false} // Esconde a busca nesta página
            />
            {mapUserDataToCard(user)}
        </Container>
    );
};

export default UserOverview;

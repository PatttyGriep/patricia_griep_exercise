import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types';
import {getTeamOverview, getUserData} from '../api';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';

const mapUserDataToListItem = (users: UserData[]): ListItem[] => {
    return users.map(u => ({
        id: u.id,
        url: `/user/${u.id}`,
        columns: [
            {key: 'Name', value: `${u.firstName} ${u.lastName}`},
            {key: 'Display Name', value: u.displayName},
            {key: 'Location', value: u.location},
        ],
        navigationProps: u,
    }));
};

const mapTeamLeadToListItem = (tlead: UserData): ListItem => {
    return {
        id: tlead.id,
        url: `/user/${tlead.id}`,
        columns: [
            {key: 'Team Lead', value: 'Team Lead'},
            {key: 'Name', value: `${tlead.firstName} ${tlead.lastName}`},
            {key: 'Display Name', value: tlead.displayName},
            {key: 'Location', value: tlead.location},
        ],
        navigationProps: tlead,
    };
};

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const [pageData, setPageData] = React.useState<PageState>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    React.useEffect(() => {
        const getTeamUsers = async () => {
            try {
                const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
                const teamLead = await getUserData(teamLeadId);
                const teamMembers = await Promise.all(teamMemberIds.map(getUserData));
                setPageData({teamLead, teamMembers});
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Failed to fetch team data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        getTeamUsers();
    }, [teamId]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const allMembers = [
        ...(pageData.teamLead ? [mapTeamLeadToListItem(pageData.teamLead)] : []),
        ...mapUserDataToListItem(pageData?.teamMembers ?? []),
    ];

    const filteredTeamMembers = allMembers.filter(item =>
        item.columns.find(col => col.key === 'Name').value.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => 
        a.columns.find(col => col.key === 'Name').value.localeCompare(
            b.columns.find(col => col.key === 'Name').value
        )
    );

    const teamLeadCard = pageData.teamLead && filteredTeamMembers.find(item => item.id === pageData.teamLead.id);

    return (
        <Container>
            <Header title={`Team ${location.state?.name || 'undefined'}`} onSearch={handleSearch} />
            {!isLoading && teamLeadCard && (
                <Card
                    columns={teamLeadCard.columns}
                    url={teamLeadCard.url}
                    navigationProps={teamLeadCard.navigationProps}
                    fullWidth
                />
            )}
            <List
                items={filteredTeamMembers.filter(item => item.id !== pageData.teamLead?.id)}
                isLoading={isLoading}
            />
        </Container>
    );
};

export default TeamOverview;

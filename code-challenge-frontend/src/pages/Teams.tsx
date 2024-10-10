import * as React from 'react';
import {ListItem, Teams as TeamsList} from 'types';
import {getTeams as fetchTeams} from '../api';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';

const mapTeamsToListItem = (teams: TeamsList[]): ListItem[] => {
    return teams.map(team => ({
        id: team.id,
        url: `/team/${team.id}`,
        columns: [{key: 'Name', value: team.name}],
        navigationProps: team,
    }));
};

const Teams = () => {
    const [teams, setTeams] = React.useState<TeamsList[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    React.useEffect(() => {
        const fetchAndSetTeams = async () => {
            try {
                const response = await fetchTeams();
                setTeams(response);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Failed to fetch teams:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAndSetTeams();
    }, []);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const filteredTeams = teams
        .filter(team => team.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name)); // Ordenar alfabeticamente pelo nome da equipe

    return (
        <Container>
            <Header title="Teams" showBackButton={false} onSearch={handleSearch} />
            <List items={mapTeamsToListItem(filteredTeams)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;

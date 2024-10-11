import * as React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import * as API from '../../api';
import TeamOverview from '../TeamOverview';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            name: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

describe('TeamOverview', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render team overview users', async () => {
        const teamOverview = {
            id: '1',
            teamLeadId: '2',
            teamMemberIds: ['3', '4', '5'],
        };
        const userData = {
            id: '2',
            firstName: 'userData',
            lastName: 'userData',
            displayName: 'userData',
            location: '',
            avatar: '',
        };
        const teamMembers = [
            { id: '3', firstName: 'userData', lastName: 'userData', displayName: 'userData', location: '', avatar: '' },
            { id: '4', firstName: 'userData', lastName: 'userData', displayName: 'userData', location: '', avatar: '' },
            { id: '5', firstName: 'userData', lastName: 'userData', displayName: 'userData', location: '', avatar: '' },
        ];
        jest.spyOn(API, 'getTeamOverview').mockImplementationOnce(() => Promise.resolve(teamOverview));
        jest.spyOn(API, 'getUserData').mockImplementation((id) => {
            if (id === '2') return Promise.resolve(userData);
            return Promise.resolve(teamMembers.find(member => member.id === id));
        });

        render(<TeamOverview />);

        await waitFor(() => {
            expect(screen.queryAllByText('userData')).toHaveLength(4);
        });
    });
});

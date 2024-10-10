import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Teams} from 'types';
import Card from '..';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

describe('Card', () => {
    it('should render card with single column', () => {
        const columns = [{ key: 'columnKey', value: 'columnValue' }];
        render(<Card columns={columns} />);

        expect(screen.getByText('columnKey')).toBeInTheDocument();
        expect(screen.getByText('columnValue')).toBeInTheDocument();
    });

    it('should render card with multiple columns', () => {
        const columns = [
            {key: 'columnKey1', value: 'columnValue1'},
            {key: 'columnKey2', value: 'columnValue2'},
            {key: 'columnKey3', value: 'columnValue3'},
            {key: 'columnKey4', value: '' },
        ];
        render(<Card columns={columns} />);

        expect(screen.getByText('columnKey1')).toBeInTheDocument();
        expect(screen.getByText('columnValue1')).toBeInTheDocument();
        expect(screen.getByText('columnKey2')).toBeInTheDocument();
        expect(screen.getByText('columnValue2')).toBeInTheDocument();
        expect(screen.getByText('columnKey3')).toBeInTheDocument();
        expect(screen.getByText('columnValue3')).toBeInTheDocument();
        expect(screen.getByText('columnKey4')).toBeInTheDocument();
    });

    it('should navigate when card is clicked and navigation is enabled', () => {
        const navProps = {
            id: '1',
            name: 'Team 1',
        } as Teams;
        render(
            <Card
                columns={[{key: 'columnKey', value: 'columnValue'}]}
                url="path"
                navigationProps={navProps}
            />
        );

        fireEvent.click(screen.getByText('columnKey'));

        expect(mockUseNavigate).toHaveBeenCalledWith('path', {state: navProps});
    });

    it('should not navigate when card is clicked and navigation is disabled', () => {
        render(<Card columns={[{key: 'columnKey', value: 'columnValue'}]} hasNavigation={false} />);

        fireEvent.click(screen.getByText('columnKey'));

        expect(mockUseNavigate).not.toHaveBeenCalled();
    });

    it('should render card with id', () => {
        const columns = [{ key: 'columnKey', value: 'columnValue' }];
        render(<Card id="test-id" columns={columns} />);

        expect(screen.getByTestId('cardContainer-test-id')).toBeInTheDocument();
    });

    it('should render card without id', () => {
        const columns = [{ key: 'columnKey', value: 'columnValue' }];
        render(<Card columns={columns} />);

        expect(screen.getByText('columnKey')).toBeInTheDocument();
    });

    it('should apply hasNavigation prop correctly', () => {
        const columns = [{ key: 'columnKey', value: 'columnValue' }];
        const { rerender } = render(<Card columns={columns} hasNavigation={true} />);
        expect(screen.getByTestId('cardContainer-undefined')).toHaveStyle('cursor: pointer');

        rerender(<Card columns={columns} hasNavigation={false} />);
        expect(screen.getByTestId('cardContainer-undefined')).toHaveStyle('cursor: default');
    });

});

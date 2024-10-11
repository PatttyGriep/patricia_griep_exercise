import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Header from '..';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

describe('Header', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render header', () => {
        render(<Header title="Header" />);

        expect(screen.getByText('Header')).toBeInTheDocument();
    });

    it('should render back button in header', () => {
        render(<Header title="Header" showBackButton />);

        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should not render back button in header', () => {
        render(<Header title="Header" showBackButton={false} />);

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should navigate back when back button is clicked', () => {
        render(<Header title="Header" showBackButton />);

        fireEvent.click(screen.getByRole('button'));

        expect(mockUseNavigate).toHaveBeenCalled();
    });

    it('should render search input when onSearch is provided', () => {
        render(<Header title="Header" onSearch={jest.fn()} />);

        expect(screen.getByPlaceholderText('Search by name...')).toBeInTheDocument();
    });

    it('should call onSearch with the correct value when typing in search input', () => {
        const mockOnSearch = jest.fn();
        render(<Header title="Header" onSearch={mockOnSearch} />);

        const searchInput = screen.getByPlaceholderText('Search by name...');
        fireEvent.change(searchInput, {target: {value: 'test'}});

        expect(mockOnSearch).toHaveBeenCalledWith('test');
    });
});

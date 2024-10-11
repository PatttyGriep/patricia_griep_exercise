import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../index';

describe('Search', () => {
    it('should render search input', () => {
        render(<Search onSearch={jest.fn()} />);
        expect(screen.getByPlaceholderText('Search by name...')).toBeInTheDocument();
    });

    it('should call onSearch with input value', () => {
        const onSearchMock = jest.fn();
        render(<Search onSearch={onSearchMock} />);

        const input = screen.getByPlaceholderText('Search by name...');
        fireEvent.change(input, { target: { value: 'test' } });

        expect(onSearchMock).toHaveBeenCalledWith('test');
    });

    it('should show clear button when input has value', () => {
        render(<Search onSearch={jest.fn()} />);

        const input = screen.getByPlaceholderText('Search by name...');
        fireEvent.change(input, { target: { value: 'test' } });

        expect(screen.getByText('✖')).toBeInTheDocument();
    });

    it('should clear input and call onSearch with empty string when clear button is clicked', () => {
        const onSearchMock = jest.fn();
        render(<Search onSearch={onSearchMock} />);

        const input = screen.getByPlaceholderText('Search by name...');
        fireEvent.change(input, { target: { value: 'test' } });

        const clearButton = screen.getByText('✖');
        fireEvent.click(clearButton);

        expect(input).toHaveValue('');
        expect(onSearchMock).toHaveBeenCalledWith('');
    });
});

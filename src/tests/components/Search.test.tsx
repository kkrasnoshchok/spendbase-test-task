import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Search } from '../../components/Search'

describe('SearchInput', () => {
    test('renders Search component', () => {
        const { getByRole } = render(<Search onSubmit={() => null} />)
        expect(getByRole('searchTitle')).toBeVisible()
        expect(getByRole('searchInput')).toBeVisible()
        expect(getByRole('searchSubmitButton')).toBeVisible()
    })

    test('Calls onSubmit handler with current `searchValue', () => {
        const onSubmitMock = jest.fn()
        const { getByRole } = render(<Search onSubmit={onSubmitMock} />)

        const input = getByRole('searchInput')
        const searchButton = getByRole('searchSubmitButton')

        fireEvent.change(input, { target: { value: 'TestQuery' } })
        fireEvent.click(searchButton)

        expect(onSubmitMock).toHaveBeenCalledWith('TestQuery')
    })
})

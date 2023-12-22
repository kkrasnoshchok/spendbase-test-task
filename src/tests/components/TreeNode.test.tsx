import React from 'react'
import { render, screen } from '@testing-library/react'

// import { TreeNode } from '../../components/TreeNode'
import { mockApiData } from '../../resources/api-data'

test('renders current date', () => {
    // render(<TreeNode node={mockApiData} />)
    const timeFormat = screen.getByText(/GMT/i)
    expect(timeFormat).toBeInTheDocument()
})

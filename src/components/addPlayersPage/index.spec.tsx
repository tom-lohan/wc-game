import React from 'react'
import '@testing-library/jest-dom'
import { renderComponentTestFunction } from '../../utils/renderComponentTestFunction'
import { AddPlayersPage } from '.'

const mockedSetSelectedPage = jest.fn()

describe('AddPlayerPage', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    it('should render correctly', () => {
        const { container } = renderComponentTestFunction(
            <AddPlayersPage setSelectedPage={mockedSetSelectedPage} />
        )
        expect(container).toMatchSnapshot()
    })
})

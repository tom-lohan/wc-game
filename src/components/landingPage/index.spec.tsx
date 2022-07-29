import React from 'react'
import '@testing-library/jest-dom'
import { renderComponentTestFunction } from '../../utils/renderComponentTestFunction'
import { LandingPage } from '.'

const mockedSetSelectedPage = jest.fn()

describe('LandingPage', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    it('should render correctly', () => {
        const { container } = renderComponentTestFunction(
            <LandingPage setSelectedPage={mockedSetSelectedPage} />
        )
        expect(container).toMatchSnapshot()
    })
})

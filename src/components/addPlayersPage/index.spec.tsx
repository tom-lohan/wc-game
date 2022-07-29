import React from 'react'
import '@testing-library/jest-dom'
import { renderComponentTestFunction } from '../../utils/renderComponentTestFunction'
import { AddPlayersPage } from '.'
import { fireEvent, screen } from '@testing-library/react'
import { WCGInitialState } from '../../wcgSlice'
import { RootState } from '../../store'

const mockedSetSelectedPage = jest.fn()

describe('AddPlayerPage', () => {
    let modifiedStore: RootState
    beforeEach(() => {
        modifiedStore = {
            wcgame: {
                ...WCGInitialState,
            },
        }
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    it('should render correctly', () => {
        const { container } = renderComponentTestFunction(
            <AddPlayersPage setSelectedPage={mockedSetSelectedPage} />
        )
        expect(container).toMatchSnapshot()
    })

    it('should be able to add players', () => {
        renderComponentTestFunction(
            <AddPlayersPage setSelectedPage={mockedSetSelectedPage} />
        )

        const inputField = screen.getByTestId('playerNameInput')
        fireEvent.change(inputField, { target: { value: 'Tom' } })

        const addPlayerBtn = screen.getByTestId('addPlayerBtn')
        fireEvent.click(addPlayerBtn)

        expect(screen.getByTestId('playerList')).toHaveTextContent('Tom')
    })

    it('should be able to remove player', () => {
        modifiedStore = {
            wcgame: {
                ...WCGInitialState,
                players: [{ name: 'John' }, { name: 'Mary' }, { name: 'Mark' }],
            },
        }
        renderComponentTestFunction(
            <AddPlayersPage setSelectedPage={mockedSetSelectedPage} />,
            modifiedStore
        )

        const removePlayerBtn = screen.getByTestId('removePlayerBtn_1')
        fireEvent.click(removePlayerBtn)

        expect(screen.getByTestId('playerList')).toHaveTextContent(
            '1. John2. Mark'
        )
    })

    it('should disable add player btn if value matches an already added name', () => {
        modifiedStore = {
            wcgame: {
                ...WCGInitialState,
                players: [{ name: 'John' }, { name: 'Mary' }, { name: 'Mark' }],
            },
        }
        renderComponentTestFunction(
            <AddPlayersPage setSelectedPage={mockedSetSelectedPage} />,
            modifiedStore
        )

        const inputField = screen.getByTestId('playerNameInput')
        fireEvent.change(inputField, { target: { value: 'John' } })

        expect(screen.getByTestId('addPlayerBtn')).toBeDisabled()
    })

    it('next page btn should enable/disable correctly', () => {
        modifiedStore = {
            wcgame: {
                ...WCGInitialState,
                players: [{ name: 'John' }, { name: 'Mary' }],
            },
        }
        renderComponentTestFunction(
            <AddPlayersPage setSelectedPage={mockedSetSelectedPage} />,
            modifiedStore
        )

        expect(screen.getByTestId('nextPageBtn')).toBeDisabled()

        const inputField = screen.getByTestId('playerNameInput')
        fireEvent.change(inputField, { target: { value: 'Tom' } })

        const addPlayerBtn = screen.getByTestId('addPlayerBtn')
        fireEvent.click(addPlayerBtn)

        expect(screen.getByTestId('nextPageBtn')).toBeEnabled()
    })
})

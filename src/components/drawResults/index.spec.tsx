import { DrawResults } from '.'
import { Player } from '../../types'
import { renderComponentTestFunction } from '../../utils/renderComponentTestFunction'

const mockedRedraw = jest.fn()

describe('CountryList', () => {
    let mockedPlayers: Player[] = []
    beforeEach(() => {
        mockedPlayers = [
            {
                name: 'Tom',
                country: {
                    name: 'Fakeland',
                    emoji: '😎',
                    ranking: 1,
                    group: 'A',
                    id: 'abc',
                },
            },
            {
                name: 'Mary',
                country: {
                    name: 'MadeUpLand',
                    emoji: '🥸',
                    ranking: 2,
                    group: 'A',
                    id: 'def',
                },
            },
            {
                name: 'Joe',
                country: {
                    name: 'Imaginaria',
                    emoji: '🤠',
                    ranking: 3,
                    group: 'A',
                    id: 'ghi',
                },
            },
        ]
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    it('should render correctly', () => {
        const { container } = renderComponentTestFunction(
            <DrawResults players={mockedPlayers} redraw={mockedRedraw} />
        )
        expect(container).toMatchSnapshot()
    })
})

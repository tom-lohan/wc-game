import { CountryList } from '.'
import { Country } from '../../types'
import { renderComponentTestFunction } from '../../utils/renderComponentTestFunction'

describe('CountryList', () => {
    let mockedCountries: Country[] = []
    beforeEach(() => {
        mockedCountries = [
            {
                name: 'Fakeland',
                emoji: '😎',
                ranking: 1,
                group: 'A',
                id: 'abc',
            },
            {
                name: 'MadeUpLand',
                emoji: '🥸',
                ranking: 2,
                group: 'A',
                id: 'def',
            },
            {
                name: 'Imaginaria',
                emoji: '🤠',
                ranking: 3,
                group: 'A',
                id: 'ghi',
            },
        ]
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    it('should render correctly', () => {
        const { container } = renderComponentTestFunction(
            <CountryList
                countries={mockedCountries}
                isDraggingFromOtherList={false}
                droppableId="mockedList1"
            />
        )
        expect(container).toMatchSnapshot()
    })
})

import { DrawPage } from '.'
import { RootState } from '../../store'
import { renderComponentTestFunction } from '../../utils/renderComponentTestFunction'
import { WCGInitialState } from '../../wcgSlice'

const mockedSetSelectedPage = jest.fn()

describe('DrawPage', () => {
    // let modifiedStore: RootState
    beforeEach(() => {
        // modifiedStore = {
        //     wcgame: {
        //         ...WCGInitialState,
        //     },
        // }
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    it('should render correctly', () => {
        const { container } = renderComponentTestFunction(
            <DrawPage setSelectedPage={mockedSetSelectedPage} />
        )
        expect(container).toMatchSnapshot()
    })
})

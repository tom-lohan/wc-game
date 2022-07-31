import './App.css'
import { AddPlayersPage, DrawPage, LandingPage } from './containers'
import 'antd/dist/antd.min.css'
import { useState } from 'react'
import { PageType } from './types'

function App() {
    const [selectedPage, setSelectedPage] = useState<PageType>(
        PageType.LANDING_PAGE
    )

    return (
        <div className="App">
            {selectedPage === PageType.LANDING_PAGE && (
                <LandingPage setSelectedPage={setSelectedPage} />
            )}
            {selectedPage === PageType.ADD_PLAYERS_PAGE && (
                <AddPlayersPage setSelectedPage={setSelectedPage} />
            )}
            {selectedPage === PageType.MAKE_DRAW_PAGE && (
                <DrawPage setSelectedPage={setSelectedPage} />
            )}
        </div>
    )
}

export default App

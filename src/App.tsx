import React, { useState } from 'react'
import './App.css'
import { AddPlayersPage, LandingPage } from './components'
import 'antd/dist/antd.min.css'

export enum PageType {
    LANDING_PAGE = 'landing_page',
    ADD_PLAYERS_PAGE = 'add_players_page',
}

function App() {
    const [selectedPage, setSelectedPage] = useState<PageType>(
        PageType.LANDING_PAGE
    )

    return (
        <div className="App">
            {selectedPage === PageType.LANDING_PAGE && (
                <LandingPage
                    clickHandler={() =>
                        setSelectedPage(PageType.ADD_PLAYERS_PAGE)
                    }
                />
            )}
            {selectedPage === PageType.ADD_PLAYERS_PAGE && <AddPlayersPage />}
        </div>
    )
}

export default App

import { Button } from 'antd'
import React, { FC } from 'react'
import { PageType } from '../../types'
import './index.css'

type LandingPageProps = {
    setSelectedPage: any
}

export const LandingPage: FC<LandingPageProps> = (props) => {
    const { setSelectedPage } = props
    return (
        <main
            className="landingPage flex flex-col justify-center items-center"
            data-testid="landing_page"
        >
            <h1 className="title px-5">World Cup 2022 Sweepstakes</h1>
            <Button
                onClick={() => setSelectedPage(PageType.ADD_PLAYERS_PAGE)}
                size="large"
            >
                Get started
            </Button>
        </main>
    )
}

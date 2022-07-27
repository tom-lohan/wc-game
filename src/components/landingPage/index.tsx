import { Button } from 'antd'
import React, { FC } from 'react'
import './index.css'

type LandingPageProps = {
    clickHandler: () => void
}

export const LandingPage: FC<LandingPageProps> = (props) => {
    const { clickHandler } = props
    return (
        <main
            className="landingPage flex flex-col justify-center items-center"
            data-testid="landing_page"
        >
            <h1 className="title px-5">World Cup 2022 Sweepstakes</h1>
            <Button onClick={clickHandler} size="large">
                Get started
            </Button>
        </main>
    )
}

import { Button } from 'antd'
import React, { FC } from 'react'
import './index.css'

export const LandingPage: FC = () => {
    return (
        <main
            className="landingPage flex flex-col justify-center items-center"
            data-testid="landing_page"
        >
            <h1 className="title px-5">World Cup 2022 Sweepstakes</h1>
            <Button size="large">Get started</Button>
        </main>
    )
}

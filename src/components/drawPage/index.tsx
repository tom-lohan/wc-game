import { Button } from 'antd'
import { FC } from 'react'
import { PageType } from '../../types'

type DrawPageProps = {
    setSelectedPage: any
}

export const DrawPage: FC<DrawPageProps> = (props) => {
    const { setSelectedPage } = props

    return (
        <>
            <main className="drawPage flex p-5">
                <Button
                    onClick={() => setSelectedPage(PageType.ADD_PLAYERS_PAGE)}
                >
                    Back
                </Button>
                <h1>hi</h1>
            </main>
        </>
    )
}

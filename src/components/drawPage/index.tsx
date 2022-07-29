import { Button } from 'antd'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { PageType } from '../../types'
import { selectCurrentPlayers, selectRankedCountries } from '../../wcgSlice'
import './index.css'

type DrawPageProps = {
    setSelectedPage: any
}

export const DrawPage: FC<DrawPageProps> = (props) => {
    const { setSelectedPage } = props
    const players = useSelector(selectCurrentPlayers)
    const rankedCountries = useSelector(selectRankedCountries)

    return (
        <>
            <main className="drawPage p-5">
                <Button
                    onClick={() => setSelectedPage(PageType.ADD_PLAYERS_PAGE)}
                >
                    Back
                </Button>
                <div className="flex gap-7 mt-5">
                    <div className="players ">
                        <h2 className="text-3xl">Players</h2>
                        <div className="playerList flex gap-4 flex-wrap">
                            {players.map((player, index) => (
                                <div
                                    className="playerCard flex items-center justify-center border-2 border-black p-3"
                                    key={index}
                                >
                                    <p className="m-0">{player.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="countries">
                        <div className="flex gap-3 items-baseline">
                            <h2 className="text-3xl">Countries</h2>
                            <span>
                                Ordered using{' '}
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://www.theguardian.com/football/2022/jun/15/world-cup-2022-power-rankings-final-32-qatar"
                                >
                                    the Guardian's power rankings
                                </a>{' '}
                            </span>
                        </div>
                        <div className="countryList flex gap-4 flex-wrap">
                            {rankedCountries.map((country, index) => (
                                <div
                                    className="playerCard flex items-center justify-center border-2 border-black p-3"
                                    key={index}
                                >
                                    <div className="m-0 flex gap-2 justify-center items-center">
                                        <span>{country.name}</span>
                                        <span className="text-xl">
                                            {country.emoji}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

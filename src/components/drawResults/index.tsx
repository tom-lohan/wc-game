import { Button } from 'antd'
import { FC, useEffect, useState } from 'react'
import { Player } from '../../types'

type DrawResultsProps = {
    players: Player[]
    redraw: () => void
}

export const DrawResults: FC<DrawResultsProps> = (props) => {
    const { players, redraw } = props

    const [sortedPlayers, setSortedPlayers] = useState<Player[]>([])

    useEffect(() => {
        setSortedPlayers(
            [...players].sort((pA, pB) =>
                pA.name.toLocaleLowerCase() < pB.name.toLowerCase() ? -1 : 1
            )
        )
    }, [players])

    const calOptimumWidth = () => {
        if (players.length % 6 === 0) {
            return 'w-1/6'
        } else if (players.length % 5 === 0) {
            return 'w-1/5'
        } else if (players.length % 4 === 0) {
            return 'w-1/4'
        } else if (players.length % 3 === 0) {
            return 'w-1/3'
        }
    }

    const calOptimumPrintWidth = () => {
        if (players.length < 29 && players.length % 4 === 0) {
            return 'print:w-1/4'
        } else if (players.length < 22 && players.length % 3 === 0) {
            return 'print:w-1/3'
        }

        return 'print:w-1/4'
    }

    return (
        <>
            <h1 className="text-3xl text-center">World Cup 2022</h1>
            <div className="flex flex-wrap justify-center">
                {sortedPlayers.map((player, index) => (
                    <div
                        className={`${calOptimumWidth()} ${calOptimumPrintWidth()}`}
                        key={index}
                    >
                        <div className="bordered border-2 m-2 py-3 text-center">
                            <h1 className="text-lg">{player.name}</h1>
                            <p className="m-0 text-3xl">
                                {player.country?.emoji}
                            </p>
                            <p className="m-0">{player.country?.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center mt-5 print:hidden">
                <Button size="large" onClick={redraw}>
                    Re-draw
                </Button>
            </div>
        </>
    )
}

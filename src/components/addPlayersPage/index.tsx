import { HighlightOff } from '@mui/icons-material'
import { Button, Empty, Input } from 'antd'
import { FC, useState } from 'react'
import { Player } from '../../types/player'
import './index.css'

export const AddPlayersPage: FC = () => {
    const [players, setPlayers] = useState<Player[]>([])
    const [inputVal, setInputVal] = useState('')

    const addPlayer = () => {
        setPlayers([...players, { name: inputVal.trim() }])
        setInputVal('')
    }

    const removePlayer = (player: Player) => {
        setPlayers(players.filter((p) => player.name !== p.name))
    }

    const isInvalid = players.some(
        (player: Player) => player.name.trim() === inputVal.trim()
    )

    return (
        <>
            <main className="addPlayersPage flex">
                <div className="col left_col p-10">
                    <h2 className="text-3xl">Add Players</h2>
                    <p>
                        Get started by adding the names of the people you want
                        to include in the draw
                    </p>
                    <div className="mt-5">
                        <Input
                            size="large"
                            placeholder="name"
                            onChange={(event) =>
                                setInputVal(event.target.value)
                            }
                            value={inputVal}
                            status={isInvalid ? 'error' : ''}
                            onKeyDown={(event) => {
                                if (
                                    event.key === 'Enter' &&
                                    inputVal.length > 2
                                ) {
                                    event.preventDefault()
                                    addPlayer()
                                }
                            }}
                            suffix={
                                <Button
                                    size="large"
                                    disabled={isInvalid || inputVal.length < 3}
                                    onClick={addPlayer}
                                >
                                    Add
                                </Button>
                            }
                        />
                    </div>
                </div>
                <div className="col right_col p-5 flex justify-center items-center">
                    <div className="playersList">
                        {players.map((player, index) => (
                            <div
                                className="playerCard flex items-center gap-3"
                                key={index}
                            >
                                <p className="text-xl m-0">{player.name}</p>
                                <Button
                                    size="small"
                                    shape="circle"
                                    onClick={() => removePlayer(player)}
                                    icon={<HighlightOff />}
                                />
                            </div>
                        ))}
                    </div>
                    {!players.length && (
                        <Empty description="No players added yet" />
                    )}
                </div>
            </main>
        </>
    )
}

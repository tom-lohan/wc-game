import ClearIcon from '@mui/icons-material/Clear'
import { Button, Empty, Input } from 'antd'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Player, PageType } from '../../types'
import {
    removePlayerByName,
    selectCurrentPlayers,
    addPlayer,
} from '../../wcgSlice'
import './index.css'

type AddPlayersPageProps = {
    setSelectedPage: any
}

export const AddPlayersPage: FC<AddPlayersPageProps> = (props) => {
    const { setSelectedPage } = props
    const dispatch = useDispatch()
    const players = useSelector(selectCurrentPlayers)
    const [inputVal, setInputVal] = useState('')

    const submitPlayer = () => {
        dispatch(addPlayer({ name: inputVal.trim() }))
        setInputVal('')
    }

    const removePlayer = (player: Player) => {
        dispatch(removePlayerByName(player.name))
    }

    const isInvalid = players.some(
        (player: Player) => player.name.trim() === inputVal.trim()
    )

    return (
        <>
            <main className="addPlayersPage flex">
                <div className="col left_col flex p-5 flex-col justify-between">
                    <div className="flex">
                        <Button
                            onClick={() =>
                                setSelectedPage(PageType.LANDING_PAGE)
                            }
                        >
                            Back
                        </Button>
                    </div>
                    <div>
                        <h2 className="text-3xl">Add Players</h2>
                        <p>
                            Get started by adding the names of the people you
                            want to include in the draw
                        </p>
                        <p>You can add between 3 and 32 players</p>
                        <div className="mt-5">
                            <Input
                                size="large"
                                placeholder="name"
                                data-testid="playerNameInput"
                                onChange={(event) =>
                                    setInputVal(event.target.value)
                                }
                                value={inputVal}
                                status={isInvalid ? 'error' : ''}
                                disabled={players.length > 31}
                                onKeyDown={(event) => {
                                    if (
                                        event.key === 'Enter' &&
                                        inputVal.length > 2 &&
                                        !isInvalid
                                    ) {
                                        event.preventDefault()
                                        submitPlayer()
                                    }
                                }}
                                suffix={
                                    <Button
                                        size="large"
                                        data-testid="addPlayerBtn"
                                        disabled={
                                            isInvalid ||
                                            inputVal.length < 3 ||
                                            players.length > 31
                                        }
                                        onClick={submitPlayer}
                                    >
                                        Add
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <Button
                            size="large"
                            onClick={() =>
                                setSelectedPage(PageType.MAKE_DRAW_PAGE)
                            }
                            disabled={players.length < 3}
                        >
                            Next
                        </Button>
                    </div>
                </div>
                <div className="col right_col">
                    <div className="teamSheet ">
                        <h2 className="text-white text-5xl pt-10">
                            WC2022 Teamsheet
                        </h2>
                        <div
                            data-testid="playerList"
                            className="playerList flex flex-col gap-3 items-center flex-wrap"
                        >
                            {players.map((player, index) => (
                                <div
                                    className="playerCard flex items-center gap-3"
                                    key={index}
                                >
                                    <p className="playerName text-xl m-0 truncate">
                                        {index + 1}. {player.name}
                                    </p>
                                    <Button
                                        size="small"
                                        shape="circle"
                                        data-testid={`removePlayerBtn_${index}`}
                                        onClick={() => removePlayer(player)}
                                        icon={<ClearIcon />}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {!players.length && (
                        <Empty description="No players added yet" />
                    )}
                </div>
            </main>
        </>
    )
}

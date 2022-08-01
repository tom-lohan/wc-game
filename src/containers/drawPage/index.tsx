import { Button } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PageType, Player } from '../../types'
import {
    selectCurrentPlayers,
    selectExcludedCountries,
    selectIncludedCountries,
    selectRankedCountries,
    setExcludedCountries,
    setIncludedCountries,
    setPlayers,
} from '../../wcgSlice'
import './index.css'
import {
    DragDropContext,
    DropResult,
    DragStart,
    ResponderProvided,
} from 'react-beautiful-dnd'
import { countries } from '../../data/counties'
import { useDispatch } from 'react-redux'
import { CountryList, DrawResults } from '../../components'

type DrawPageProps = {
    setSelectedPage: any
}

export const DrawPage: FC<DrawPageProps> = (props) => {
    const { setSelectedPage } = props
    const dispatch = useDispatch()
    const players = useSelector(selectCurrentPlayers)
    const rankedCountries = useSelector(selectRankedCountries)

    const includedCountries = useSelector(selectIncludedCountries)
    const excludedCountries = useSelector(selectExcludedCountries)

    const [isDraggingFromExcluded, setIsDraggingFromExcluded] =
        useState<boolean>(false)
    const [isDraggingFromIncluded, setIsDraggingFromIncluded] =
        useState<boolean>(false)

    const [hasExecutedDraw, setHasExecutedDraw] = useState<boolean>(false)

    useEffect(() => {
        if (
            players &&
            players.length &&
            rankedCountries &&
            !(includedCountries.length || excludedCountries.length)
        ) {
            dispatch(
                setIncludedCountries(rankedCountries.slice(0, players.length))
            )
            dispatch(
                setExcludedCountries(rankedCountries.slice(players.length))
            )
        }
    }, [
        dispatch,
        excludedCountries.length,
        includedCountries.length,
        players,
        rankedCountries,
    ])

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return
        }
        setIsDraggingFromExcluded(false)
        setIsDraggingFromIncluded(false)

        const isIncludedCountry = includedCountries.some(
            (country) => country.id === result.draggableId
        )
        const country = countries.find(
            (country) => country.id === result.draggableId
        )

        if (
            country &&
            isIncludedCountry &&
            result.destination.droppableId === 'excludedCountries'
        ) {
            dispatch(setExcludedCountries([...excludedCountries, country]))
            dispatch(
                setIncludedCountries(
                    includedCountries.filter((c) => c.id !== result.draggableId)
                )
            )
        }

        if (
            country &&
            !isIncludedCountry &&
            result.destination.droppableId === 'includedCountries'
        ) {
            dispatch(setIncludedCountries([...includedCountries, country]))
            dispatch(
                setExcludedCountries(
                    excludedCountries.filter((c) => c.id !== result.draggableId)
                )
            )
        }
    }

    const onDragStart = (initial: DragStart, provided: ResponderProvided) => {
        if (initial.source.droppableId === 'excludedCountries') {
            setIsDraggingFromExcluded(true)
            setIsDraggingFromIncluded(false)
        } else {
            setIsDraggingFromExcluded(false)
            setIsDraggingFromIncluded(true)
        }
    }

    const getDrawValidationMsg = () => {
        const diff = players.length - includedCountries.length
        if (diff > 0) {
            return `- Too few countries selected. Please add ${diff} more`
        }

        if (diff < 0) {
            return `- Too many countries selected. Please remove ${diff * -1}`
        }

        return ''
    }

    const executeDraw = () => {
        let shuffledPlayers: Player[] = [...players].sort(
            () => Math.random() - 0.5
        )
        const shuffledCountries = [...includedCountries].sort(
            () => Math.random() - 0.5
        )

        shuffledPlayers = shuffledPlayers.map(
            (player: Player, index: number) => {
                return {
                    ...player,
                    country: shuffledCountries[index],
                }
            }
        )
        dispatch(setPlayers(shuffledPlayers))
        setHasExecutedDraw(true)
    }

    return (
        <>
            <main className="drawPage flex flex-col p-5">
                {!hasExecutedDraw && (
                    <>
                        <div className="flex gap-7 items-center">
                            <Button
                                onClick={() =>
                                    setSelectedPage(PageType.ADD_PLAYERS_PAGE)
                                }
                            >
                                Back
                            </Button>
                        </div>
                        <div className="flex gap-7 mt-5">
                            <div className="players ">
                                <h2 className="text-3xl">Players</h2>
                                <div className="playerList flex gap-4 flex-wrap">
                                    {[...players]
                                        .sort((pA, pB) =>
                                            pA.name.toLowerCase() <
                                            pB.name.toLowerCase()
                                                ? -1
                                                : 1
                                        )
                                        .map((player, index) => (
                                            <div
                                                className="playerCard flex items-center justify-center border-2 border-black p-3"
                                                key={index}
                                            >
                                                <p className="m-0">
                                                    {player.name}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="countries">
                                <div className="flex gap-3 items-baseline">
                                    <h2 className="text-3xl">
                                        Select Countries
                                    </h2>
                                    <span>
                                        Ordered using{' '}
                                        <a
                                            target="_blank"
                                            rel="noreferrer"
                                            href="https://www.theguardian.com/football/2022/jun/15/world-cup-2022-power-rankings-final-32-qatar"
                                        >
                                            the Guardian's power rankings.
                                        </a>{' '}
                                        <span className="pl-2">
                                            {' '}
                                            Drag to re-order
                                        </span>
                                    </span>
                                </div>
                                <div className="countryLists flex flex-col gap-4">
                                    <DragDropContext
                                        onDragStart={onDragStart}
                                        onDragEnd={onDragEnd}
                                    >
                                        <div className="flex gap-2">
                                            <h4>Included in the draw </h4>
                                            <span className="text-red">
                                                {getDrawValidationMsg()}
                                            </span>
                                        </div>
                                        <CountryList
                                            countries={includedCountries}
                                            isDraggingFromOtherList={
                                                isDraggingFromExcluded
                                            }
                                            droppableId="includedCountries"
                                        />
                                        <div className="h-2 w-full bg-gray-dark"></div>
                                        <h4>Excluded from the draw</h4>
                                        <CountryList
                                            countries={excludedCountries}
                                            isDraggingFromOtherList={
                                                isDraggingFromIncluded
                                            }
                                            droppableId="excludedCountries"
                                        />
                                    </DragDropContext>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-end justify-center h-full">
                            <Button
                                disabled={
                                    includedCountries.length !== players.length
                                }
                                size="large"
                                onClick={() => executeDraw()}
                            >
                                Draw!
                            </Button>
                        </div>
                    </>
                )}
                {hasExecutedDraw && (
                    <DrawResults
                        players={players}
                        redraw={() => setHasExecutedDraw(false)}
                    />
                )}
            </main>
        </>
    )
}

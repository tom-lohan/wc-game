import React, { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Country } from '../../types'

type CountyListProps = {
    droppableId: string
    countries: Country[]
    isDraggingFromOtherList: boolean
}

export const CountryList: FC<CountyListProps> = (props) => {
    const { countries, droppableId, isDraggingFromOtherList } = props

    return (
        <Droppable droppableId={droppableId}>
            {(provided) => (
                <div
                    className={`droppable countryList flex gap-4 flex-wrap ${
                        isDraggingFromOtherList ? 'isTargetZone' : ''
                    }`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {isDraggingFromOtherList && (
                        <div className="overlay">Drop here to add</div>
                    )}
                    <div
                        className={`flex gap-4 flex-wrap ${
                            isDraggingFromOtherList ? 'invisible' : ''
                        }`}
                    >
                        {countries.map((country, index) => (
                            <Draggable
                                key={country.id}
                                draggableId={country.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="playerCard flex items-center justify-center border-2 bg-white border-black p-3"
                                    >
                                        <div className="m-0 flex gap-2 justify-center items-center">
                                            <span>{country.name}</span>
                                            <span className="text-xl">
                                                {country.emoji}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                </div>
            )}
        </Droppable>
    )
}

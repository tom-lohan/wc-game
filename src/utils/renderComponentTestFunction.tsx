import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'
import { WCGInitialState } from '../wcgSlice'
import gameReducer from '../wcgSlice'

export const renderComponentTestFunction = (
    children: ReactNode,
    modifiedStore: object = {}
) => {
    const store = {
        wcgame: { ...WCGInitialState },
    }

    const mergedStore = { ...store, ...modifiedStore }

    const mockedStore = configureStore({
        reducer: {
            wcgame: gameReducer,
        },
        preloadedState: mergedStore,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false }),
    })

    return render(<Provider store={mockedStore}>{children}</Provider>)
}

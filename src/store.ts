import { configureStore } from "@reduxjs/toolkit";
import gameReducer from './wcgSlice';

export const store = configureStore({
	reducer: {
		wcgame: gameReducer
	},
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
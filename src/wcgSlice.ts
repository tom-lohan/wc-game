import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Player } from "./types";

export interface WCGState {
	players: Player[]
}

const initialState: WCGState = {
	players: []
}

export const WCGSlice = createSlice({
	name: 'wcgame',
	initialState,
	reducers: {
		addPlayer: (state, action: PayloadAction<Player>) => {
			return {
				...state,
				players: state.players.concat([action.payload])
			}
		},
		removePlayerByName: (state, action: PayloadAction<string>) => {
			return {
				...state,
				players: state.players.filter(player => player.name !== action.payload)
			}
		}
	}
});


export const selectCurrentPlayers = (state: RootState) => state.wcgame.players;

export const { addPlayer, removePlayerByName } = WCGSlice.actions;

export default WCGSlice.reducer;
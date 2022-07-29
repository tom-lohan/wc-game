import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Country, Player } from "./types";
import { countries } from './data/counties';

export interface WCGState {
	players: Player[],
	countries: Country[]
}

export const WCGInitialState: WCGState = {
	players: [],
	countries: countries
}

export const WCGSlice = createSlice({
	name: 'wcgame',
	initialState: WCGInitialState,
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
export const selectCurrentCountries = (state: RootState) => state.wcgame.countries;
export const selectRankedCountries = (state: RootState) => [...state.wcgame.countries].sort((cA, cB) => cA.ranking < cB.ranking ? -1 : 1);

export const { addPlayer, removePlayerByName } = WCGSlice.actions;

export default WCGSlice.reducer;
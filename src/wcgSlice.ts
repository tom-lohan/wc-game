import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Country, Player } from "./types";
import { countries } from './data/counties';

export interface WCGState {
	players: Player[],
	countries: Country[],
	includedCountries: Country[],
	excludedCountries: Country[]
}

export const WCGInitialState: WCGState = {
	players: [],
	countries: countries,
	includedCountries: [],
	excludedCountries: []
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
		},
		setPlayers: (state, action: PayloadAction<Player[]>) => {
			return {
				...state,
				players: action.payload
			}
		},
		setIncludedCountries: (state, action: PayloadAction<Country[]>) => {
			return {
				...state,
				includedCountries: action.payload
			}
		},
		setExcludedCountries: (state, action: PayloadAction<Country[]>) => {
			return {
				...state,
				excludedCountries: action.payload
			}
		}
	}
});


export const selectCurrentPlayers = (state: RootState) => state.wcgame.players;
export const selectCurrentCountries = (state: RootState) => state.wcgame.countries;
export const selectRankedCountries = (state: RootState) => [...state.wcgame.countries].sort((cA, cB) => cA.ranking < cB.ranking ? -1 : 1);
export const selectIncludedCountries = (state: RootState) => state.wcgame.includedCountries;
export const selectExcludedCountries = (state: RootState) => state.wcgame.excludedCountries;

export const { addPlayer, removePlayerByName, setPlayers, setExcludedCountries, setIncludedCountries } = WCGSlice.actions;

export default WCGSlice.reducer;
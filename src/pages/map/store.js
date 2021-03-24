import { createStore, createHook } from 'react-sweet-state';
import { produce } from 'immer';
import { defaults } from 'react-sweet-state';

defaults.devtools = true;
defaults.mutator = (currentState, producer) => produce(currentState, producer);

const Store = createStore({
	initialState: {
		markers: [],
		isGoogleApiLoaded: false,
		isModalVisible: false,
		currentArticle: {
			url: '',
			title: '',
		},
	},
	actions: {
		addMarkers: (markers) => ({ setState, getState }) => {
			const state = getState();
			const existingMarkers = state.markers.map(
				(marker) => marker.pageid
			);
			const newMarkers = markers.filter(
				(marker) => !existingMarkers.includes(marker.pageid)
			);

			setState((draft) => {
				draft.markers.push(...newMarkers);
			});
		},
		setGoogleApiLoaded: (value) => ({ setState, getState }) => {
			setState((draft) => {
				draft.isGoogleApiLoaded = value;
			});
		},
		setModalVisible: (value) => ({ setState, getState }) => {
			setState((draft) => {
				draft.isModalVisible = value;
			});
		},
		setCurrentArticle: ({ url, title }) => ({ setState, getState }) => {
			setState((draft) => {
				draft.currentArticle = {
					url,
					title,
				};
			});
		},
	},
});

export const useMapStore = createHook(Store);

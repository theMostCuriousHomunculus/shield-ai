import geolocationStore from '../stores/geolocation';

/** gets the user's current geolocation position, watches for changes to it, and updates the {@link geolocationStore} to reflect the current value */
const watchPosition = () => {
	geolocationStore.setState(
		(prevState) => ({
			...prevState,
			enabled: true,
			error: null,
			locating: true,
			permission: 'granted',
		}),
	);

	const positionCallback: PositionCallback = (geolocationPosition) => {
		geolocationStore.setState(
			(prevState) => ({
				...prevState,
				enabled: true,
				error: null,
				locating: false,
				permission: 'granted',
				position: geolocationPosition,
			}),
		);
	};

	const positionErrorCallback: PositionErrorCallback = (geolocationPositionError) => {
		navigator.geolocation.clearWatch(geolocationStore.state.watchId);
		geolocationStore.setState(
			(prevState) => ({
				...prevState,
				enabled: false,
				error: geolocationPositionError,
				locating: false,
				position: null,
				watchId: NaN,
			}),
		);
	};

	const positionOptions: PositionOptions = { enableHighAccuracy: true };

	navigator
		.geolocation
		.getCurrentPosition(
			positionCallback,
			positionErrorCallback,
			positionOptions,
		);
	geolocationStore.setState(
		(prevState) => ({
			...prevState,
			watchId: navigator
				.geolocation
				.watchPosition(
					positionCallback,
					positionErrorCallback,
					positionOptions,
				),
		}),
	);
};

export default watchPosition;

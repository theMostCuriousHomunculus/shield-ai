import { useEffect } from 'react';

import geolocationStore from '../stores/geolocation';
import watchPosition from '../utils/watch-position';

const registerPermissionStatusChangeEventListener = ({
	abortController,
	permissionStatus,
}: {
	abortController: AbortController;
	permissionStatus: PermissionStatus;
}) => {
	permissionStatus.addEventListener(
		'change',
		() => {
			geolocationStore.setState(
				(prevState) => {
					switch (permissionStatus.state) {
						case 'denied':
						case 'prompt':
							navigator.geolocation.clearWatch(geolocationStore.state.watchId);
							return {
								enabled: false,
								error: null,
								locating: false,
								permission: permissionStatus.state,
								position: null,
								watchId: NaN,
							};
						case 'granted':
							return {
								...prevState,
								permission: 'granted',
							};
					}
				},
			);
		},
		{ signal: abortController.signal },
	);
};

const initializeGeolocationStoreState = (permissionStatus: PermissionStatus) => {
	if (permissionStatus.state === 'granted') {
		geolocationStore.setState({
			enabled: true,
			error: null,
			locating: true,
			permission: 'granted',
			position: null,
			watchId: NaN,
		});
		watchPosition();
	} else {
		geolocationStore.setState({
			enabled: false,
			error: null,
			locating: false,
			permission: permissionStatus.state,
			position: null,
			watchId: NaN,
		});
	}
};

/**
 * checks the geolocation permission status, sets up a listener to watch for changes to the permission, and updates the {@link geolocationStore} to reflect the value
 *
 * if the permission changes to 'denied' or 'prompt', we stop watching the user's position
 *
 * if permission has been granted, {@link watchPosition} is called
 */
const useRegisterGeolocationPermissionStatusChangeListener = () => {
	useEffect(
		() => {
			const abortController = new AbortController();

			if (
				'geolocation' in navigator
				&& 'permissions' in navigator
			) {
				navigator
					.permissions
					.query({ name: 'geolocation' })
					.then(
						(permissionStatus) => {
							registerPermissionStatusChangeEventListener({
								abortController,
								permissionStatus,
							});

							initializeGeolocationStoreState(permissionStatus);
						},
					);
			}

			return () => abortController.abort();
		},
		[],
	);
};

export default useRegisterGeolocationPermissionStatusChangeListener;

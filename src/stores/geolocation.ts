import { Store } from '../classes/Store';

export type GeolocationStoreValue =
	| {
		enabled: false | undefined;
		error: GeolocationPositionError | null;
		locating: false;
		permission: PermissionStatus['state'] | undefined;
		position: null;
		watchId: number;
	}
	| {
		enabled: true;
		error: null;
		locating: boolean;
		permission: 'granted';
		position: GeolocationPosition | null;
		watchId: number;
	};

const geolocationStore = new Store<GeolocationStoreValue>({
	enabled: false,
	error: null,
	locating: false,
	permission: undefined,
	position: null,
	watchId: NaN,
});

export default geolocationStore;

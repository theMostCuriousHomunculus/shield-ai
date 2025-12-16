import {
	type FC,
	useEffect,
} from 'react';
import {
	AdvancedMarker,
	useMap,
} from '@vis.gl/react-google-maps';
import { getRouteApi } from '@tanstack/react-router';

import NavigationIcon from '../../assets/navigation.svg?react';
import deviceOrientationEventToCompassHeadingDegrees from '../../utils/device-orientation-to-compass-heading-degrees';
import deviceOrientationStore from '../../stores/device-orientation';
import geolocationStore from '../../stores/geolocation';
import useStore from '../../hooks/store';

const route = getRouteApi('/map/');

const OrientedUserPositionMarker: FC = () => {
	const {
		center,
		heading,
	} = route.useSearch();
	const map = useMap();
	const throttledDeviceOrientation = useStore({
		selector: (state) => state,
		store: deviceOrientationStore,
		throttle: 100 / 3,
	});
	const throttledGeolocationPosition = useStore({
		selector: (state) => state.position,
		store: geolocationStore,
		throttle: 100 / 3,
	});
	const compassHeadingDegrees = throttledDeviceOrientation ? deviceOrientationEventToCompassHeadingDegrees(throttledDeviceOrientation) : NaN;
	const rotate = (typeof heading === 'undefined' || Number.isNaN(compassHeadingDegrees)) ? '0' : `${compassHeadingDegrees - heading}deg`;

	// if the map's center is not fixed, have it reflect the user's position
	useEffect(
		() => {
			if (
				typeof center === 'undefined'
				&& throttledGeolocationPosition
			) {
				map?.setCenter({
					lat: throttledGeolocationPosition.coords.latitude,
					lng: throttledGeolocationPosition.coords.longitude,
				});
			}
		},
		[
			center,
			map,
			throttledGeolocationPosition,
		],
	);

	// if the map's heading is not fixed, have it reflect the device's orientation
	useEffect(
		() => {
			if (
				typeof heading === 'undefined'
				&& !Number.isNaN(compassHeadingDegrees)
			) {
				map?.setHeading(compassHeadingDegrees);
			}
		},
		[
			heading,
			map,
			compassHeadingDegrees,
		],
	);

	if (!map) return null;

	return (
		<AdvancedMarker
			position={throttledGeolocationPosition
				? {
					lat: throttledGeolocationPosition.coords.latitude,
					lng: throttledGeolocationPosition.coords.longitude,
				}
				: undefined
			}
		>
			<NavigationIcon
				color="error"
				height={48}
				style={{ rotate }}
				width={48}
			/>
		</AdvancedMarker>
	);
};

export default OrientedUserPositionMarker;

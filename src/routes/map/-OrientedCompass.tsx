import type { FC } from 'react';
import { getRouteApi } from '@tanstack/react-router';

import Compass from '../../assets/compass.svg?react';
import deviceOrientationEventToCompassHeadingDegrees from '../../utils/device-orientation-to-compass-heading-degrees';
import deviceOrientationStore from '../../stores/device-orientation';
import useStore from '../../hooks/store';

const route = getRouteApi('/map/');

const OrientedCompass: FC = () => {
	const { heading } = route.useSearch();
	const throttledDeviceOrientation = useStore({
		selector: (state) => state,
		store: deviceOrientationStore,
		throttle: 100 / 3,
	});
	const rotate = (() => {
		const compassHeadingDegrees = throttledDeviceOrientation
			? deviceOrientationEventToCompassHeadingDegrees(throttledDeviceOrientation)
			: NaN;

		if (Number.isNaN(compassHeadingDegrees)) return `${360 - (heading ?? 0)}deg`;

		return typeof heading === 'undefined'
			? `${360 - compassHeadingDegrees}deg`
			: `${360 - heading}deg`
	})();

	return (
		<Compass
			height={72}
			style={{ rotate }}
			width={72}
		/>
	);
};

export default OrientedCompass;

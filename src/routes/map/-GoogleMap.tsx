import type { FC } from 'react';
import {
	ControlPosition,
	Map,
	MapControl,
} from '@vis.gl/react-google-maps';
import { getRouteApi } from '@tanstack/react-router';

import OrientationControl from './-OrientationControl';
import OrientedCompass from './-OrientedCompass';
import OrientedUserPositionMarker from './-OrientedUserPositionMarker';
import deviceOrientationEventToCompassHeadingDegrees from '../../utils/device-orientation-to-compass-heading-degrees';
import deviceOrientationStore from '../../stores/device-orientation';
import geolocationStore from '../../stores/geolocation';
import useOnDragStart from '../../hooks/on-drag-start';
import useOnHeadingChanged from '../../hooks/on-heading-changed';
import useOnIdle from '../../hooks/on-idle';
import useOnZoomChanged from '../../hooks/on-zoom-changed';

const route = getRouteApi('/map/');

const GoogleMap: FC = () => {
	const {
		center,
		heading,
		zoom,
	} = route.useSearch();
	const onDragStart = useOnDragStart();
	const onHeadingChanged = useOnHeadingChanged();
	const onIdle = useOnIdle();
	const onZoomChanged = useOnZoomChanged();

	return (
		<Map
			cameraControlOptions={{ position: ControlPosition.LEFT_BOTTOM }}
			defaultCenter={(() => {
				if (center) return center;
				return geolocationStore.state.position
					? {
						lat: geolocationStore.state.position.coords.latitude,
						lng: geolocationStore.state.position.coords.longitude,
					}
					: undefined;
			})()}
			defaultHeading={(() => {
				if (typeof heading === 'number') return heading;
				const compassHeadingDegrees = deviceOrientationStore.state
					? deviceOrientationEventToCompassHeadingDegrees(deviceOrientationStore.state)
					: NaN;
				return Number.isNaN(compassHeadingDegrees)
					? undefined
					: compassHeadingDegrees;
			})()}
			defaultZoom={zoom}
			mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
			onDragstart={onDragStart}
			onHeadingChanged={onHeadingChanged}
			onIdle={onIdle}
			onZoomChanged={onZoomChanged}
			style={{ flexGrow: 1 }}
		>
			<MapControl position={ControlPosition.TOP_RIGHT}>
				<div
					style={{
						alignItems: 'flex-end',
						display: 'flex',
						flexDirection: 'column',
						padding: 8,
						rowGap: 8,
					}}
				>
					<OrientedCompass />

					<OrientationControl />
				</div>
			</MapControl>

			<OrientedUserPositionMarker />
		</Map>
	);
};

export default GoogleMap;

import type { FC } from 'react';
import { getRouteApi } from '@tanstack/react-router';
import { useMap } from '@vis.gl/react-google-maps';

import ExploreIcon from '../../assets/explore.svg?react';
import GpsFixedIcon from '../../assets/gps-fixed.svg?react';
import GpsNotFixedIcon from '../../assets/gps-not-fixed.svg?react';
import geolocationStore from '../../stores/geolocation';


const route = getRouteApi('/map/');

const OrientationControl: FC = () => {
	const {
		center,
		heading,
	} = route.useSearch();
	const map = useMap();
	const navigate = route.useNavigate();

	if (!center) {
		return typeof heading === 'number'
			? (
				<button
					aria-label="fix-map-heading-on-user-direction"
					onClick={() => {
						navigate({
							replace: true,
							search(current) {
								return {
									...current,
									heading: undefined,
								};
							},
						});
					}}
					style={{
						backgroundColor: '#3B82F6',
						borderRadius: '100%',
					}}
				>
					<GpsFixedIcon
						height={56}
						width={56}
					/>
				</button>
			)
			: (
				<button
					aria-label="fix-map-heading-on-north"
					onClick={() => {
						map?.setHeading(0);
						map?.setTilt(0);
						navigate({
							replace: true,
							search(current) {
								return {
									...current,
									heading: 0,
								};
							},
						});
					}}
					style={{
						backgroundColor: '#3B82F6',
						borderRadius: '100%',
					}}
				>
					<ExploreIcon
						height={56}
						width={56}
					/>
				</button>
			);
	}

	return (
		<button
			aria-label="fix-map-center-on-user-position"
			onClick={() => {
				if (geolocationStore.state.position) {
					map?.panTo({
						lat: geolocationStore.state.position.coords.latitude,
						lng: geolocationStore.state.position.coords.longitude,
					});
				}

				navigate({
					replace: true,
					search(current) {
						return {
							...current,
							center: undefined,
						};
					},
				});
			}}
			style={{
				backgroundColor: '#3B82F6',
				borderRadius: '100%',
			}}
		>
			<GpsNotFixedIcon
				height={56}
				width={56}
			/>
		</button>
	);
};

export default OrientationControl;

import { useState } from 'react';
import {
	type RouteComponent,
	createFileRoute,
} from '@tanstack/react-router';
import { APIProvider } from '@vis.gl/react-google-maps';
import z from 'zod';

import GoogleMap from './-GoogleMap';
import Metrics from './-Metrics';
import geolocationStore from '../../stores/geolocation';
import useStore from '../../hooks/store';
import useRegisterDeviceOrientationEventListener from '../../hooks/register-device-orientation-event-listener';
import useRegisterGeolocationPermissionStatusChangeListener from '../../hooks/register-geolocation-position-status-change-listener';
import Message from './-Message';

const Component: RouteComponent = () => {
	useRegisterDeviceOrientationEventListener();
	useRegisterGeolocationPermissionStatusChangeListener();
	const [loading, setLoading] = useState(true);
	const geolocationEnabled = useStore({
		selector: (store) => store.enabled,
		store: geolocationStore,
	});
	const geolocationLocating = useStore({
		selector: (store) => store.locating,
		store: geolocationStore,
	});

	return (
		geolocationEnabled
		&& !geolocationLocating
	)
		? (
			<main
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100vh',
				}}
			>
				<APIProvider
					apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
					onLoad={() => setLoading(false)}
				>
					{loading
						? <div>Loading Google Map...</div>
						: <GoogleMap />}
				</APIProvider>

				<Metrics />
			</main>
		)
		: (
			<main
				style={{
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					justifyContent: 'center',
					padding: 8,
					rowGap: 8,
				}}
			>
				<Message />
			</main>
		);
};

export const Route = createFileRoute('/map/')({
	component: Component,
	validateSearch: z.object({
		center: z.optional(
			z.object({
				lat: z.number().gte(-90).lte(90),
				lng: z.number().gte(-180).lte(180),
			}),
		),
		heading: z
			.number()
			.gte(0)
			.lt(360)
			.optional(),
		zoom: z
			.number()
			.min(0)
			.default(19),
	}),
});

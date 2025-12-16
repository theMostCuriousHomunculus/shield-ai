import {
	type ComponentProps,
	useCallback,
} from 'react';
import type { Map } from '@vis.gl/react-google-maps';
import { getRouteApi } from '@tanstack/react-router';

import geolocationStore from '../stores/geolocation';

const route = getRouteApi('/map/');

const useOnZoomChanged = () => {
	const {
		center,
		zoom,
	} = route.useSearch();
	const navigate = route.useNavigate();
	return useCallback<NonNullable<ComponentProps<typeof Map>['onZoomChanged']>>(
		({ detail }) => {
			navigate({
				replace: true,
				search(current) {
					return {
						...current,
						...(
							(
								center
								|| detail.center.lat !== geolocationStore.state.position?.coords.latitude
								|| detail.center.lng !== geolocationStore.state.position?.coords.longitude
							)
								? { center: detail.center }
								: {}
						),
						zoom: detail.zoom,
					};
				},
			});
		},
		[
			center,
			navigate,
			zoom,
		],
	);
};

export default useOnZoomChanged;

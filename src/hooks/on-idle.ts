import {
	type ComponentProps,
	useCallback,
} from 'react';
import type { Map } from '@vis.gl/react-google-maps';
import { getRouteApi } from '@tanstack/react-router';

const route = getRouteApi('/map/');

const useOnIdle = () => {
	const {
		center,
		heading,
	} = route.useSearch();
	const navigate = route.useNavigate();
	const typeOfHeading = typeof heading;
	return useCallback<NonNullable<ComponentProps<typeof Map>['onIdle']>>(
		({ map }) => {
			navigate({
				replace: true,
				search(current) {
					return {
						...current,
						...(center ? { center: map.getCenter()?.toJSON() } : {}),
						...(typeOfHeading === 'number' ? { heading: map.getHeading() } : {}),
						zoom: map.getZoom() ?? 19,
					};
				},
			});
		},
		[
			center,
			navigate,
			typeOfHeading,
		],
	);
};

export default useOnIdle;

import {
	type ComponentProps,
	useCallback,
} from 'react';
import type { Map } from '@vis.gl/react-google-maps';
import { getRouteApi } from '@tanstack/react-router';

const route = getRouteApi('/map/');

const useOnHeadingChanged = () => {
	const { heading } = route.useSearch();
	const navigate = route.useNavigate();
	const typeOfHeading = typeof heading;
	return useCallback<NonNullable<ComponentProps<typeof Map>['onHeadingChanged']>>(
		({ detail }) => {
			if (typeOfHeading === 'number') {
				navigate({
					replace: true,
					search(current) {
						return {
							...current,
							heading: detail.heading,
						};
					},
				});
			}
		},
		[
			navigate,
			typeOfHeading,
		],
	);
};

export default useOnHeadingChanged;

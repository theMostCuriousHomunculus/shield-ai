import {
	type ComponentProps,
	useCallback,
} from 'react';
import type { Map } from '@vis.gl/react-google-maps';
import { getRouteApi } from '@tanstack/react-router';

const route = getRouteApi('/map/');

const useOnDragStart = () => {
	const navigate = route.useNavigate();
	return useCallback<NonNullable<ComponentProps<typeof Map>['onDragstart']>>(
		({ map }) => {
			navigate({
				replace: true,
				search(current) {
					return {
						...current,
						center: map.getCenter()?.toJSON(),
						heading: map.getHeading(),
					};
				},
			});
		},
		[navigate],
	);
};

export default useOnDragStart;

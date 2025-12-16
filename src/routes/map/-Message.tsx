import type { FC } from 'react';

import useStore from '../../hooks/store';
import geolocationStore from '../../stores/geolocation';
import watchPosition from '../../utils/watch-position';

const Message: FC = () => {
	const geolocationLocating = useStore({
		selector: (store) => store.locating,
		store: geolocationStore,
	});
	const geolocationPermission = useStore({
		selector: (store) => store.permission,
		store: geolocationStore,
	});

	switch (geolocationPermission) {
		case 'denied':
			return (
				<>
					<p style={{ textAlign: 'center' }}>
						You have denied the application access to your location in your browser and/or device settings.
					</p>
					<p style={{ textAlign: 'center' }}>
						To see the map, you will need to grant the application location permission in your browser and/or device settings.
					</p>
				</>
			);
		case 'granted':
		case 'prompt':
			return geolocationLocating
				? (
					<p style={{ textAlign: 'center' }}>
						Determining Your Location...
					</p>
				)
				: (
					<>
						<p style={{ textAlign: 'center' }}>
							You must grant location permission to see the map.
						</p>

						<button
							disabled={geolocationLocating}
							onClick={() => {
								if (!('geolocation' in navigator)) return alert('"geolocation" is not in navigator!');
								if (!('permissions' in navigator)) return alert('"permissions" is not in navigator!')
								watchPosition();
							}}
							type="button"
						>
							Prompt me!
						</button>
					</>
				);
		default:
			return <div>One moment...</div>;
	}
};

export default Message;

import { useEffect } from 'react'

import deviceOrientationStore from '../stores/device-orientation';

/** sets up a listener to watch for changes to the device's orientation and updates the {@link deviceOrientationStore} to reflect the value */
const useRegisterDeviceOrientationEventListener = () => {
	useEffect(
		() => {
			const abortController = new AbortController();
			const eventListener = (event: DeviceOrientationEvent) => deviceOrientationStore.setState(event);

			if ('ondeviceorientationabsolute' in window) {
				addEventListener(
					'deviceorientationabsolute',
					eventListener,
					{ signal: abortController.signal },
				);
			} else if ('ondeviceorientation' in window) {
				addEventListener(
					'deviceorientation',
					eventListener,
					{ signal: abortController.signal },
				);
			}

			return () => abortController.abort();
		},
		[],
	);
};

export default useRegisterDeviceOrientationEventListener;

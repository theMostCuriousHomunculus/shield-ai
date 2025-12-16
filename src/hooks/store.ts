import { useCallback } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector';

import type { Store } from '../classes/Store.ts';

const useStore = <TState, TSelection>({
	selector,
	store,
	throttle = NaN,
}: {
	selector: (snapshot: TState) => TSelection;
	store: Store<TState>;
	/** the interval to delay updates (in milliseconds) */
	throttle?: number;
}) => {
	const subscribe = useCallback<Parameters<typeof useSyncExternalStoreWithSelector>[0]>(
		(onStoreChange) => store.register({
			intervalId: Number.isNaN(throttle)
				? NaN
				: setInterval(
					onStoreChange,
					throttle,
				),
			onStoreChange,
		}),
		[
			store,
			throttle,
		],
	);

	const getSnapshot = useCallback(
		() => store.state,
		[store],
	);

	return useSyncExternalStoreWithSelector(
		subscribe,
		getSnapshot,
		getSnapshot,
		selector,
	);
};

export default useStore;

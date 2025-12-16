import type { SetStateAction } from 'react';

type Subscription = {
	intervalId: number;
	onStoreChange: () => void;
};

export class Store<T> {
	subscriptions = new Set<Subscription>();
	state: T;

	constructor(initialState: T) {
		this.state = initialState;
	}

	register(subscription: Subscription) {
		this.subscriptions.add(subscription);
		return () => {
			clearInterval(subscription.intervalId);
			this.subscriptions.delete(subscription);
		};
	};

	/** update the state and notify all subscribers */
	setState(newState: SetStateAction<T>) {
		const nextValue = newState instanceof Function
			? newState(this.state)
			: newState;

		this.state = nextValue;
		this
			.subscriptions
			.forEach(({
				intervalId,
				onStoreChange,
			}) => {
				if (Number.isNaN(intervalId)) onStoreChange();
			});
	}
};

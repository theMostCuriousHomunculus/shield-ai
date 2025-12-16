import {
	type FC,
	type SetStateAction,
	useSyncExternalStore,
} from 'react';

import {
	type RouteComponent,
	createFileRoute,
} from '@tanstack/react-router';
import InputLabel from '../components/InputLabel';
import PageTitle from '../components/PageTitle';
import Table from '../components/Table';
import data from '../data/champions.json';

const queryStore = {
	setValue(newValue: SetStateAction<string>) {
		queryStore.value = newValue instanceof Function
			? newValue(queryStore.value)
			: newValue;
		queryStore.subscribers.forEach((callback) => callback());
	},
	subscribers: new Set<() => void>(),
	value: '',
};

const useQueryStore = () => useSyncExternalStore(
	(onStoreChange) => {
		queryStore.subscribers.add(onStoreChange);
		return () => {
			queryStore.subscribers.delete(onStoreChange);
		}
	},
	() => queryStore.value,
);

const QueryInput: FC = () => {
	console.log('rendering "QueryInput"');
	const query = useQueryStore();

	return (
		<input
			aria-label="query"
			aria-labelledby="query-label"
			id="query-input"
			onChange={({ target: { value } }) => queryStore.setValue(value)}
			type="text"
			style={{ border: '3px solid black' }}
			value={query}
		/>
	)
};

const Tally: FC = () => {
	console.log('rendering "Tally"');
	const query = useQueryStore();

	return query
		? (
			<p style={{ border: '3px solid black' }}>
				{`${query} has won ${data.reduce<number>((pv, cv) => cv.Champion === query ? pv + 1 : pv, 0)} championships.`}
			</p>
		)
		: null;
};

const Component: RouteComponent = () => {
	return (
		<main style={{ padding: 8 }}>
			<PageTitle />

			<InputLabel />

			<QueryInput />

			<Tally />

			<Table />
		</main>
	)
};

export const Route = createFileRoute('/signal')({ component: Component });


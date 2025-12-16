import {
	type FC,
	useState,
} from 'react';
import {
	type RouteComponent,
	createFileRoute,
} from '@tanstack/react-router';

import InputLabel from '../components/InputLabel';
import PageTitle from '../components/PageTitle';
import Table from '../components/Table';

const QueryInput: FC = () => {
	const [query, setQuery] = useState('');

	return (
		<input
			aria-label="query"
			aria-labelledby="query-label"
			id="query-input"
			onChange={({ target: { value } }) => setQuery(value)}
			style={{ border: '3px solid black' }}
			type="text"
			value={query}
		/>
	)
};

const Component: RouteComponent = () => {
	return (
		<main style={{ padding: 8 }}>
			<PageTitle />

			<InputLabel />

			<QueryInput />

			<Table />
		</main>
	)
};

export const Route = createFileRoute('/better')({ component: Component });

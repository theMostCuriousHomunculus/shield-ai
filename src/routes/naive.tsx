import { useState } from 'react';
import {
	type RouteComponent,
	createFileRoute,
} from '@tanstack/react-router';

import InputLabel from '../components/InputLabel';
import PageTitle from '../components/PageTitle';
import Table from '../components/Table';

const Component: RouteComponent = () => {
	const [query, setQuery] = useState('');

	return (
		<main style={{ padding: 8 }}>
			<PageTitle />

			<InputLabel />

			<input
				aria-label="query"
				aria-labelledby="query-label"
				id="query-input"
				onChange={({ target: { value } }) => setQuery(value)}
				type="text"
				style={{ border: '3px solid black' }}
				value={query}
			/>

			<Table />
		</main>
	)
};

export const Route = createFileRoute('/naive')({ component: Component });

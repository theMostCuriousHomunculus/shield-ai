import { useState } from 'react';
import {
	type RouteComponent,
	createFileRoute,
} from '@tanstack/react-router';

import InputLabel from '../components/InputLabel';
import PageTitle from '../components/PageTitle';
import Table from '../components/Table';
import data from '../data/champions.json';

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
				style={{ border: '3px solid black' }}
				type='text'
				value={query}
			/>

			{!!query
				&& (
					<p style={{ border: '3px solid black' }}>
						{`${query} has won ${data.reduce<number>((pv, cv) => cv.Champion === query ? pv + 1 : pv, 0)} championships.`}
					</p>
				)}

			<Table />
		</main>
	)
};

export const Route = createFileRoute('/realistic')({ component: Component });

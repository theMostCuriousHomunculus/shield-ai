import type { FC } from 'react';
import {
	type RouteComponent,
	createFileRoute,
} from '@tanstack/react-router';
import z from 'zod';

import InputLabel from '../components/InputLabel';
import PageTitle from '../components/PageTitle';
import Table from '../components/Table';
import data from '../data/champions.json';

const QueryInput: FC = () => {
	console.log('rendering "QueryInput"');
	const { query } = Route.useSearch();
	const navigate = Route.useNavigate();
	return (
		<input
			aria-label="query"
			aria-labelledby="query-label"
			id="query-input"
			onChange={({ target: { value } }) => {
				navigate({
					search: (current) => ({
						...current,
						query: value,
					}),
					replace: true,
				})
			}}
			type="text"
			style={{ border: '3px solid black' }}
			value={query}
		/>
	);
};

const Tally: FC = () => {
	console.log('rendering "Tally"');
	const { query } = Route.useSearch();
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

export const Route = createFileRoute('/search-params')({
	component: Component,
	validateSearch: z.object({ query: z.string().default('') }),
});


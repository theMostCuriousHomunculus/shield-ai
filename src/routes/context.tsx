import {
	type Dispatch,
	type FC,
	type PropsWithChildren,
	type SetStateAction,
	createContext,
	useContext,
	useMemo,
	useState,
} from 'react';
import {
	type RouteComponent,
	createFileRoute,
} from '@tanstack/react-router';

import InputLabel from '../components/InputLabel';
import PageTitle from '../components/PageTitle';
import Table from '../components/Table';

const Context = createContext<{
	count: number;
	query: string;
	setCount: Dispatch<SetStateAction<number>>;
	setQuery: Dispatch<SetStateAction<string>>;
} | undefined>(undefined);

const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [query, setQuery] = useState('');
	const [count, setCount] = useState(0);
	const contextValue = useMemo(
		() => ({
			count,
			query,
			setCount,
			setQuery,
		}),
		[
			count,
			query,
		],
	)

	return (
		<Context value={contextValue}>
			{children}
		</Context>
	)
};

const useTheContext = () => {
	const context = useContext(Context);
	if (!context) throw new Error('useQueryContext must be called in a hook or component wrapped by a QueryContext provider!');
	return context;
};

const CountButton: FC = () => {
	console.log('rendering "CountButton"');
	const {
		count,
		setCount,
	} = useTheContext();

	return (
		<div style={{ border: '3px solid black' }}>
			<button
				onClick={() => setCount((prevState) => prevState + 1)}
				type="button"
			>
				{`Increment the count! (The count is ${count})`}
			</button>
		</div>
	)
};

const QueryInput: FC = () => {
	console.log('rendering "QueryInput"');
	const {
		query,
		setQuery,
	} = useTheContext();

	return (
		<input
			aria-label="query"
			aria-labelledby="query-label"
			id="query-input"
			onChange={({ target: { value } }) => setQuery(value)}
			type='text'
			style={{ border: '3px solid black' }}
			value={query}
		/>
	)
};

const Component: RouteComponent = () => {
	return (
		<ContextProvider>
			<main style={{ padding: 8 }}>
				<PageTitle />

				<CountButton />

				<InputLabel />

				<QueryInput />

				<Table />
			</main>
		</ContextProvider>
	)
};

export const Route = createFileRoute('/context')({ component: Component });

import {
	createFileRoute,
	Link,
	type RouteComponent,
} from '@tanstack/react-router';

const Component: RouteComponent = () => {
	return (
		<main
			style={{
				display: 'flex',
				flexDirection: 'column',
				padding: 8,
				rowGap: 8,
			}}
		>
			<Link to="/naive">
				Naïve
			</Link>

			<Link to="/better">
				Better
			</Link>

			<Link to="/realistic">
				Realistic
			</Link>

			<Link to="/memoized">
				Memoized
			</Link>

			<Link to="/context">
				Context
			</Link>

			<Link to="/signal">
				Signal
			</Link>

			<Link to="/search-params">
				Search Params
			</Link>

			<Link to="/map">
				Map
			</Link>
		</main>
	)
};

export const Route = createFileRoute('/')({ component: Component });

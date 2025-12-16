import type { FC } from 'react';

const InputLabel: FC = () => {
	console.log('rendering "InputLabel"');
	
	return (
		<label
			htmlFor="query-input"
			id="query-label"
			style={{ border: '3px solid black' }}
		>
			Search
		</label>
	);
};

export default InputLabel;

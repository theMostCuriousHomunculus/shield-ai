import type { FC } from 'react';

const PageTitle: FC = () => {
	console.log('rendering "PageTitle"');

	return <h1 style={{ border: '3px solid black' }}>NCAA Football National Champions</h1>;
};

export default PageTitle;

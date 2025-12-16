import type { FC } from 'react';

import TableRow from './TableRow';
import data from '../data/champions.json';

const Table: FC = () => {
	console.log('rendering "Table"');

	return (
		<div style={{ border: '3px solid black' }}>
			<table>
				<caption>
					NCAA football national champions
				</caption>
				<thead>
					<tr>
						<th>
							Season
						</th>
						<th>
							Champion
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((cv) => <TableRow key={`${cv.Season}${cv.Champion}`} {...cv} />)}
				</tbody>
			</table>
		</div>
	);
};

export default Table;

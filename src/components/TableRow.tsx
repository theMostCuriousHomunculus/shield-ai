import type { FC } from 'react';

import type data from '../data/champions.json';

const TableRow: FC<typeof data[number]> = ({
	Champion,
	Season,
}) => {
	return (
		<tr>
			<td>
				{Season}
			</td>
			<td>
				{Champion}
			</td>
		</tr>
	);
};

export default TableRow;

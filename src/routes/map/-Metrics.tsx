import type { FC } from 'react';

import geolocationStore from '../../stores/geolocation';
import useStore from '../../hooks/store';

const Metrics: FC = () => {
	const position = useStore({
		store: geolocationStore,
		selector: (snapshot) => snapshot.position,
	});

	return (
		<table>
			<caption>
				Metrics
			</caption>
			<thead>
				<tr>
					<th>
						Accuracy
					</th>
					<th>
						Altitude
					</th>
					<th>
						Altitude Accuracy
					</th>
					<th>
						Heading
					</th>
					<th>
						Latitude
					</th>
					<th>
						Longitude
					</th>
					<th>
						Speed
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style={{ textAlign: 'center' }}>
						{position?.coords.accuracy ?? '???'}
					</td>
					<td style={{ textAlign: 'center' }}>
						{position?.coords.altitude ?? '???'}
					</td>
					<td style={{ textAlign: 'center' }}>
						{position?.coords.altitudeAccuracy ?? '???'}
					</td>
					<td style={{ textAlign: 'center' }}>
						{position?.coords.heading ?? '???'}
					</td>
					<td style={{ textAlign: 'center' }}>
						{position?.coords.latitude ?? '???'}
					</td>
					<td style={{ textAlign: 'center' }}>
						{position?.coords.longitude ?? '???'}
					</td>
					<td style={{ textAlign: 'center' }}>
						{position?.coords.speed ?? '???'}
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default Metrics;

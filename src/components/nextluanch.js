import { useState, useEffect } from 'react';

import { getNextLaunch } from '../services/api';

import { Typography, Spin } from 'antd';

import ShowData from './showdata';


const { Title } = Typography;

export default function NextLuanch(setItem) {
	const [loading, setLoading] = useState(true);
	const [launchData, setLaunchData] = useState();
	const [errorData, setErrorData] = useState();

	const fetchData = async () => {
		setLoading(true);
		const [data, error] = await getNextLaunch();
		setLaunchData(data?.results[0]);
		setErrorData(error);
		setLoading(false);
	};

	useEffect(() => {
		setItem.setItem('item-2')
		fetchData();
	}, []);

	return (
		<div style={{
			margin: '20px 0',
			marginBottom:'20px',
			textAlign: 'center',
			borderRadius: '4px',
		}}>
			{loading && <Spin size="large"/>}
			{!!errorData && (
				<code>
					Error:
					<br />
					{errorData}
				</code>
			)}
			{!loading && !errorData && !launchData && <div>No data</div>}
			{!errorData && !!launchData && (
				<ShowData launchData={launchData}/>
				)}
		</div>
	);
}

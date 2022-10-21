import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { getLastLaunch } from '../services/api';
import ShowData from './showdata';
import Error from './error'

export default function LastLuanch(setItem) {
	const [loading, setLoading] = useState(true);
	const [launchData, setLaunchData] = useState();
	const [errorData, setErrorData] = useState();

	const fetchData = async () => {
		setLoading(true);
		const [data, error] = await getLastLaunch();
		setLaunchData(data?.results[0]);
		setErrorData(error);
		setLoading(false);
	};

	useEffect(() => {
		setItem.setItem('item-1');
		fetchData();
	}, []);

	return (
		<div className='lastluanch' style={{
			margin: '20px 0',
			marginBottom:'20px',
			textAlign: 'center',
			borderRadius: '4px',
		}}>
			{loading && <Spin size='large' />}
			{!!errorData && (
				<Error/>
			)}
			{!loading && !errorData && !launchData && <div>No data</div>}
			{!errorData && !!launchData && (
				<ShowData launchData={launchData}/>
			)}
		</div>
	);
}

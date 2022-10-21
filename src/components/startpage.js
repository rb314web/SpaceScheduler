import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNextLaunch } from '../services/api';
import { Spin, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import AOS from 'aos';
import Error from './error'
import 'aos/dist/aos.css';
import '../assets/styles/startpage.css';


export default function StartPage(setItem) {
	const [loading, setLoading] = useState(true);
	const [launchData, setLaunchData] = useState();
	const [errorData, setErrorData] = useState();

	useEffect(() => {
		setItem.setItem('');
		fetchData();
		AOS.init();
	}, []);


	const fetchData = async () => {
		setLoading(true);
		const [data, error] = await getNextLaunch();
		setLaunchData(data?.results[0]);
		setErrorData(error);
		setLoading(false);
	};

	const time = () => {
		const date = new Date(launchData.net);
		return date.toLocaleString();
	};

	return (
		<div
			style={{
				margin: '20px 0',
				marginBottom: '20px',
				textAlign: 'center',
				borderRadius: '4px',
			}}>
			{loading && <Spin size='large' />}

			{!!errorData && (
				<Error/>
			)}

			{!loading && !errorData && !launchData && <div>No data</div>}

			{!errorData && !!launchData && (
				<div className='startpage'>
					<div className='startpage_shadow'>
						<div data-aos="fade-up" className='startpage_info'>
							<h2>
								<FormattedMessage id='app.startpage' /> {launchData.name}
							</h2>
							<p>{time()}</p>
							<Button size='large' type='primary'>
								<Link to='/next'>
									<FormattedMessage id='app.startpage.button' />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

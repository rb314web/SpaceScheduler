import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';
import { FormattedMessage } from 'react-intl';

const App = () => (
	<Result
		status='500'
		title='500'
		subTitle={<FormattedMessage id='app.error'/>}
		extra={
			<Link to='/'>
				<Button type='primary'>
					<FormattedMessage id='app.error.button'/>
				</Button>
			</Link>
		}
	/>
);
export default App;

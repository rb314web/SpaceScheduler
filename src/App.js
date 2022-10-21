import React, { useState, useContext } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { Breadcrumb, Layout, Menu } from 'antd';
import LastLuanch from './components/lastluanch';
import NextLuanch from './components/nextluanch';
import HistoryLuanch from './components/historyluanch';
import StartPage from './components/startpage.js';
import { FormattedMessage } from 'react-intl';
import { Context } from './components/wrapper';
import 'antd/dist/antd.min.css';
import './assets/styles/app.css';

const { Header, Content, Footer } = Layout;

function App() {
	const [selectItem, setSelectItem] = useState('');
	const context = useContext(Context);

	function setItem(item) {
		setSelectItem(item);
		if (item === 'item-1') {
			document.title = 'SpaceScheduler | Ostatni lot';
		} else if (item === 'item-2') {
			document.title = 'SpaceScheduler | Następny lot';
		} else if (item === 'item-3') {
			document.title = 'SpaceScheduler | Historia lotów';
		} else if (item === '') {
			document.title = 'SpaceScheduler | Home';
		}
	}

	return (
		<Layout>
			<Header className='header'>
				<div className='wrapper'>
					<div className='logo'>
						<Link to='/'>SpaceScheduler</Link>
					</div>

					<Menu
						theme='dark'
						mode='horizontal'
						selectedKeys={selectItem}
						items={[
							{
								label: (
									<Link to='/last'>
										<FormattedMessage id='navItem1' />
									</Link>
								),
								key: 'item-1',
							},
							{
								label: (
									<Link to='/next'>
										<FormattedMessage id='navItem2' />
									</Link>
								),
								key: 'item-2',
							},
							{
								label: (
									<Link to='/history'>
										<FormattedMessage id='navItem3' />
									</Link>
								),
								key: 'item-3',
							},
						]}
					/>
					<select
						className=''
						value={context.locale}
						onChange={context.selectLanguage}>
						<option value='en-EN'>English</option>
						<option value='pl-PL'>Polish</option>
					</select>
				</div>
			</Header>
			<Content
				style={{
					maxWidth: '1444px',
					width: '100%',
					margin: '0 auto',
					padding: '0 50px',
				}}>
				<Breadcrumb
					style={{
						margin: '16px 0',
					}}></Breadcrumb>
				<Layout
					className='site-layout-background'
					style={{
						padding: '24px 0',
					}}>
					<Content
						style={{
							padding: '0 24px',
							minHeight: 280,
						}}>
						<Routes>
							<Route exact path='/' element={<StartPage setItem={setItem} />} />
							<Route path='/last' element={<LastLuanch setItem={setItem} />} />
							<Route path='/next' element={<NextLuanch setItem={setItem} />} />
							<Route
								path='/history'
								element={<HistoryLuanch setItem={setItem} />}
							/>
							<Route path='*' element={<StartPage setItem={setItem}/>} />
						</Routes>
					</Content>
				</Layout>
			</Content>
			<Footer
				style={{
					textAlign: 'center',
				}}>
				SpaceScheduler ©{new Date().getFullYear()} Created by Radosław
				Brzeziński
			</Footer>
		</Layout>
	);
}

export default App;

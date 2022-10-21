import React, { useState, useEffect, useRef } from 'react';

import Highlighter from 'react-highlight-words';

import moment from 'moment';

import { getHistoryLaunch } from '../services/api';

import {FormattedMessage} from 'react-intl';

import {
	Table,
	Spin,
	Drawer,
	DatePicker,
	Button,
	Space,
	Input,
} from 'antd';

import { SearchOutlined } from '@ant-design/icons';

export default function HistoryLunch(setItem) {
	const [loading, setLoading] = useState(true);
	const [launchData, setLaunchData] = useState([]);
	const [launchData1, setLaunchData1] = useState([]);
	const [launchData2, setLaunchData2] = useState();
	const [errorData, setErrorData] = useState();
	const [open, setOpen] = useState(false);

	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);

	const time = (props) => {
		const date = new Date(props);
		return date.toLocaleString();
	};

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText('');
	};

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div
				style={{
					padding: 8,
				}}>
				<Input
					ref={searchInput}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: 'block',
					}}
				/>
				<Space>
					<Button
						type='primary'
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size='small'
						style={{
							width: 90,
						}}>
							<FormattedMessage id ="app.launchhistory.serch"/>
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size='small'
						style={{
							width: 90,
						}}>
						Reset
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							confirm({
								closeDropdown: false,
							});
							setSearchText(selectedKeys[0]);
							setSearchedColumn(dataIndex);
						}}>
						Filter
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					color: filtered ? '#1890ff' : undefined,
				}}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: '#ffc069',
						padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});

	useEffect(() => {
		setItem.setItem('item-3');
		fetchData();
	}, []);

	const { RangePicker } = DatePicker;

	const showDrawer = (e) => {
		setLaunchData2(launchData1[e.key])
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	const fetchData = async () => {
		setLoading(true);
		const [data, error] = await getHistoryLaunch(50);
		setLaunchData(data?.results);
		setLaunchData1(data?.results);
		processingData(data?.results);
		setErrorData(error);
		setLoading(false);
	};

	const columns = [
		{
			title: <FormattedMessage id ="app.launchhistory.action"/>,
			dataIndex: '',
			key: 'x',
			render: (e) => (
				<a
					onClick={() => {
						showDrawer(e);
					}}>
					<FormattedMessage id ="app.launchhistory.details"/>
				</a>
			),
		},
		{
			title: <FormattedMessage id ="app.launchhistory.missionname"/>,
			dataIndex: 'name',
			key: 'name',
			...getColumnSearchProps('name'),
		},
		{
			title: <FormattedMessage id ="app.launchhistory.launchdate"/>,
			dataIndex: 'launchdate',
			key: 'launchdate',
			sorter: (a, b) =>
				moment(a.launchdate).unix() - moment(b.launchdate).unix(),
		},
		{
			title: <FormattedMessage id ="app.launchhistory.launchsite"/>,
			dataIndex: 'location',
			key: 'location',
			...getColumnSearchProps('location'),
		},
	];

	const processingData = (data) => {
		let tempData = [];
		let tempKey = 0;

		data.forEach((element) => {
			let x = {
				key: `${tempKey}`,
				name: `${element.mission.name}`,
				launchdate: `${element.net.slice(0, 10)}`,
				location: `${element.pad.location.name}`,
				description: `${element.mission.description}`,
			};

			tempKey++;
			tempData.push(x);
			setLaunchData(tempData);
		});
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
				<code>
					Error:
					<br />
					{errorData}
				</code>
			)}
			{!loading && !errorData && !launchData && <div>No data</div>}
			{!loading && !errorData && !!launchData && (
				<>
					<Table columns={columns} dataSource={launchData} />
				</>
			)}

			<Drawer
				title='Szczególy misji'
				placement='right'
				onClose={onClose}
				open={open}
				width='50%'>
				<h2><FormattedMessage id ="app.launchhistory.drawer.missionname"/></h2>
				<p>{launchData2 ? launchData2.mission.name : null}</p>
				<h2><FormattedMessage id ="app.launchhistory.drawer.launchdate"/></h2>
				<p>{launchData2 ? time(launchData2.net) : null}</p>
				<h2><FormattedMessage id ="app.launchhistory.drawer.description"/></h2>
				<p>{launchData2 ? launchData2.mission.description : null}</p>
				<h2><FormattedMessage id ="app.launchhistory.drawer.rocket"/></h2>
				<p>{launchData2 ? launchData2.rocket.configuration.full_name : null}</p>
				<h2><FormattedMessage id ="app.launchhistory.drawer.pad"/></h2>
				<p>{launchData2 ? launchData2.pad.name : null}</p>
				<h2><FormattedMessage id ="app.launchhistory.drawer.status"/></h2>
				<p>{launchData2 ? launchData2.status.name : null}</p>
				<h2><FormattedMessage id ="app.launchhistory.drawer.orbit"/></h2>
				<p>{launchData2 ? launchData2.mission.orbit.name : null}</p>
				<h2><FormattedMessage id ="app.launchhistory.drawer.photo"/></h2>
				<img style={{width: '100%'}} src={launchData2 ? launchData2.pad.map_image : null}></img>

				
			</Drawer>
		</div>
	);
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { IntlProvider } from 'react-intl';
import Wrapper from "./components/wrapper";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Wrapper>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Wrapper>
);

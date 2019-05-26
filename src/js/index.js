import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import { hot } from 'react-hot-loader';

import { addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
import en from 'react-intl/locale-data/en';

const HotApp = hot(module)(Application);

addLocaleData([...de, ...en]);

ReactDOM.render(<HotApp />, document.getElementById('app-container'));

import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';

import { addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
import en from 'react-intl/locale-data/en';

addLocaleData([...de, ...en]);

ReactDOM.render(<Application />, document.getElementById('app-container'));

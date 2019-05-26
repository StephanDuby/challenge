import { PRIMARY, PURPLE, GRAY_2, TEXT, TEXT_LIGHT } from './colors';
import { navigation } from './navigation';
import { charts } from './charts';
import { statusIndicator } from './statusIndicator';
import { select } from './select';
import { table } from './table';
export const theme = {
    fontImport: 'https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900&amp;subset=latin-ext',
    defaultFontSize: '16px',
    defaultFont: 'Lato',
    specialFont: 'Merck Web',
    defaultTextColor: TEXT,
    lightTextColor: TEXT_LIGHT,
    defaultPadding: '20px',
    defaultMargin: '15px',
    brandPrimaryColor: PRIMARY,
    brandSecondaryColor: PURPLE,
    contentBG: GRAY_2,
    navigation,
    charts,
    statusIndicator,
    select,
    table
};

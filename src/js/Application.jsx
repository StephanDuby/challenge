import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { messages } from './i18n/en';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ROUTES } from './routes/routes';
import { AppShell } from './AppShell';
import { GlobalStyles } from './GlobalStyles';
import { Tracker } from './routes/Tracker/Tracker';
import { Statistics } from './routes/Statistics/Statistics';

export default class Application extends React.Component {

    render() {
        return (
            <IntlProvider locale={'en'} messages={messages}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <AppShell>
                            <GlobalStyles />
                            <Switch>
                                <Redirect exact from={ROUTES.home} to={ROUTES.tracker} />
                                <Route exact path={ROUTES.tracker} component={Tracker} />
                                <Route exact path={ROUTES.stats} component={Statistics} />
                            </Switch>
                        </AppShell>
                    </ThemeProvider>
                </BrowserRouter>
            </IntlProvider>
        );
    }

}

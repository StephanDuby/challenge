import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ROUTES } from './routes/routes';
import { AppShell } from './AppShell';
import { FontImport } from './components/elements/FontImport';
import { GlobalStyles } from './GlobalStyles';
import { Home } from './routes/Home/Home';
import { Statistics } from './routes/Statistics/Statistics';

export default class Application extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <AppShell>
                        <FontImport />
                        <GlobalStyles />
                        <Switch>
                            <Route exact path={ROUTES.root} component={Home} />
                            <Route
                                exact
                                path={ROUTES.stats}
                                component={Statistics}
                            />
                        </Switch>
                    </AppShell>
                </ThemeProvider>
            </BrowserRouter>
        );
    }

}

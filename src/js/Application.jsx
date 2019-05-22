import React from 'react';
import { Theme } from '@liquid-design/liquid-design-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ROUTES } from './routes/routes';
import { AppShell } from './AppShell';
import { Home } from './routes/Home/Home';
import { Statistics } from './routes/Statistics/Statistics';

export default class Application extends React.Component {

    render() {
        return (
            <Theme>
                <BrowserRouter>
                    <AppShell>
                        <Switch>
                            <Route exact path={ROUTES.root} component={Home} />
                            <Route
                                exact
                                path={ROUTES.stats}
                                component={Statistics}
                            />
                        </Switch>
                    </AppShell>
                </BrowserRouter>
            </Theme>
        );
    }

}

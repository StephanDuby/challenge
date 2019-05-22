import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Navigation } from '@liquid-design/liquid-design-react';
import { ROUTES } from '../routes/routes';

const StyledNavigation = styled(Navigation)`
    height: 100%;
    background: #fff;
`;

export const AppNavigation = withRouter(
    class AppNavigation extends React.Component {

        static propTypes = {
            location: propTypes.object.isRequired,
            history: propTypes.object.isRequired
        };

        state = {
            activeTabIndex: 0
        };

        handleNavClick = tabIndex => {
            this.setState(
                {
                    activeTabIndex: tabIndex
                },
                () => {
                    this.props.history.push(this.navTabs[tabIndex].route);
                }
            );
        };

        navTabs = [
            {
                title: 'Tracker',
                iconName: 'placeholder',
                onClick: this.handleNavClick,
                route: ROUTES.root
            },
            {
                title: 'Statistics',
                iconName: 'placeholder',
                onClick: this.handleNavClick,
                route: ROUTES.stats
            }
        ];

        render() {
            return (
                <StyledNavigation
                    activeTabIndex={this.state.activeTabIndex}
                    tabs={this.navTabs}
                />
            );
        }
    
    }
);

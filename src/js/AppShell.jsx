import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { AppNavigation } from './Navigation/Navigation';
import { Header, Logo } from '@liquid-design/liquid-design-react';

const ShellContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    display: flex;
    flex-direction: row;
`;

const NavigationContainer = styled.div`
    width: 80px;
    height: 100%;
    flex: 0;
`;

const ContentContainer = styled.div`
    height: 100%;
    background: #0f0;
    flex: 1;
`;

export class AppShell extends React.Component {

    static propTypes = {
        children: propTypes.any
    };

    render() {
        return (
            <ShellContainer>
                <NavigationContainer>
                    <Header logoComponent={<Logo />} />
                    <AppNavigation />
                </NavigationContainer>
                <ContentContainer>{this.props.children}</ContentContainer>
            </ShellContainer>
        );
    }

}

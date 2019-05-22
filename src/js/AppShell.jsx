import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { Navigation } from './Navigation/Navigation';

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

const ContentContainer = styled.div`
    position: relative;
    flex: 1 1;
`;

export class AppShell extends React.Component {

    static propTypes = {
        children: propTypes.any
    };

    render() {
        return (
            <ShellContainer>
                <Navigation />
                <ContentContainer>{this.props.children}</ContentContainer>
            </ShellContainer>
        );
    }

}

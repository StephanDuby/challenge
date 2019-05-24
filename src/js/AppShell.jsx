import React from 'react';
import propTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
    MobileHeader,
    MobileHamburger,
    MobileLogoContainer,
    MobileLogo,
    MOBILE_HEADER_HEIGHT
} from './components/elements/MobileHeader/MobileHeader';
import { Navigation } from './Navigation/Navigation';
import { device } from './helpers/viewportSizes';

export const NAVIGATION_WIDTH = 90;
export const MEASURE_UNITS = 'px';

const ShellContainer = styled.div`
    position: fixed;
    top: ${MOBILE_HEADER_HEIGHT};
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    display: flex;
    flex-direction: row;

    @media ${device.medium} {
        top: 0;
    }
`;

const NavigationContainer = styled.div`
    transition: left 0.5s;
    width: ${NAVIGATION_WIDTH + MEASURE_UNITS};
    position: absolute;
    left: -${NAVIGATION_WIDTH + MEASURE_UNITS};
    bottom: 0;
    top: 0;
    z-index: 1000;

    ${props =>
        props.menuOpen
            ? css`
                  left: 0;
              `
            : null};

    @media ${device.medium} {
        position: static;
    }
`;

const ContentContainer = styled.div`
    position: absolute;
    background: ${props => props.theme.contentBG};
    height: 100%;
    width: 100%;

    @media ${device.medium} {
        position: static;
        flex: 1 1;
    }
`;

export class AppShell extends React.Component {

    static propTypes = {
        children: propTypes.any
    };

    state = {
        menuOpen: false
    };

    handleMobileMenuToggle = () => {
        this.setState(state => ({
            menuOpen: !state.menuOpen
        }));
    };

    render() {
        return (
            <>
                <MobileHeader>
                    <MobileHamburger
                        onClick={this.handleMobileMenuToggle}
                        menuOpen={this.state.menuOpen}
                    />
                    <MobileLogoContainer>
                        <MobileLogo src={'/svg/Logo.svg'} />
                    </MobileLogoContainer>
                </MobileHeader>
                <ShellContainer>
                    <NavigationContainer menuOpen={this.state.menuOpen}>
                        <Navigation />
                    </NavigationContainer>
                    <ContentContainer>{this.props.children}</ContentContainer>
                </ShellContainer>
            </>
        );
    }

}

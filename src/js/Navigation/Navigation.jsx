import React from 'react';
import propTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import asNavLink from 'as-nav-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../routes/routes';

const NAVIGATION_WIDTH = 90;
const MEASURE_UNITS = 'px';

const Container = styled.div`
    width: ${NAVIGATION_WIDTH + MEASURE_UNITS};
    background: ${props => props.theme && props.theme.navigation.backgroundColor};
    overflow: hidden;
    padding: ${props => props.theme && props.theme.defaultPadding} 0;
`;

const LogoContainer = styled.div`
    width: ${NAVIGATION_WIDTH + MEASURE_UNITS};
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: ${props => props.theme && props.theme.brandPrimaryColor};
    padding: 0;
    margin-bottom: ${props => props.theme && props.theme.defaultMargin}
`;

const Logo = styled.img`
    width: 100%;
    height: auto;
`;

const IconContainer = styled.div`
    width: ${NAVIGATION_WIDTH + MEASURE_UNITS};
    color: ${props => props.theme && props.theme.navigation.iconColor};
    text-align: center;
    padding: 0;
    font-size: ${props => props.theme && props.theme.navigation.iconSize};
    
    ${props => props.active ? css`
        color: ${props => props.theme && props.theme.navigation.iconActiveColor};
    ` : null}
`;

const NavLinkLabel = styled.div`
    width: 100%;
    text-align: center;
    font-size: ${props => props.theme && props.theme.navigation.labelSize};
`;

const StyledLink = styled(Link)`
    display: inline-block;
    text-decoration: none;
    height: 90px;
    padding: 5px 0;
    overflow: hidden;
`;

const NavLinkItem = ({ to, icon, active }) => (
    <StyledLink to={to}>
        <IconContainer active={active}>
            <FontAwesomeIcon icon={icon} />
            <NavLinkLabel>label</NavLinkLabel>
        </IconContainer>
    </StyledLink>
);

NavLinkItem.propTypes = {
    to: propTypes.string.isRequired,
    icon: propTypes.object.isRequired,
    active: propTypes.bool
};

const NavLink = asNavLink()(NavLinkItem);

export class Navigation extends React.Component {

    render() {
        return (
            <Container>
                <LogoContainer>
                    <Logo src={'/images/ETE-logo_white.png'} />
                </LogoContainer>
                <NavLink exact to={ROUTES.root} icon={faSearch} />
                <NavLink to={ROUTES.stats} icon={faChartPie} />
            </Container>
        );
    }

}
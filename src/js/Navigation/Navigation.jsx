import React from 'react';
import propTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import asNavLink from 'as-nav-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../routes/routes';
import { Logo, LogoContainer } from '../components/elements/Logo/Logo';
import { device } from '../helpers/viewportSizes';

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: ${props =>
        props.theme && props.theme.navigation.backgroundColor};
    overflow: hidden;
`;

const StyledLogoContainer = styled(LogoContainer)`
    display: none;

    @media ${device.medium} {
        display: block;
    }
`;

const StyledLink = styled(Link)`
    display: inline-block;
    text-decoration: none;
    height: 80px;
    padding: 15px 0 0 0;
    overflow: hidden;
    width: 100%;
`;

const IconContainer = styled.div`
    width: 100%;
    color: ${props => props.theme && props.theme.navigation.iconColor};
    text-align: center;
    padding: 0;
    font-size: ${props => props.theme && props.theme.navigation.iconSize};

    ${props =>
        props.active
            ? css`
                  color: ${props =>
        props.theme && props.theme.navigation.iconActiveColor};
              `
            : null}
`;

const NavLinkIcon = styled(FontAwesomeIcon)`
    display: block;
    margin: 0 auto;
`;

const NavLinkLabel = styled.div`
    width: 100%;
    text-align: center;
    font-size: ${props => props.theme && props.theme.navigation.labelSize};
`;

const NavLinkItem = ({ to, icon, active, label, intl }) => (
    <StyledLink
        to={to}
        title={intl.formatMessage({ id: label })}
        alt={intl.formatMessage({ id: label })}
    >
        <IconContainer active={active}>
            <NavLinkIcon icon={icon} />
            <NavLinkLabel>{intl.formatMessage({ id: label })}</NavLinkLabel>
        </IconContainer>
    </StyledLink>
);

NavLinkItem.propTypes = {
    to: propTypes.string.isRequired,
    icon: propTypes.object.isRequired,
    active: propTypes.bool,
    label: propTypes.string,
    intl: intlShape.isRequired
};

const NavLink = asNavLink()(injectIntl(NavLinkItem));

export class Navigation extends React.Component {

    render() {
        return (
            <Container>
                <StyledLogoContainer>
                    <Logo src={'/svg/Logo.svg'} />
                </StyledLogoContainer>
                <NavLink
                    exact
                    to={ROUTES.tracker}
                    icon={faSearch}
                    label={'tracker'}
                />
                <NavLink
                    to={ROUTES.stats}
                    icon={faChartPie}
                    label={'statistics'}
                />
            </Container>
        );
    }

}

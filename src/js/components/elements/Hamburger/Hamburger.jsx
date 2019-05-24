import React from 'react';
import propTypes from 'prop-types';
import styled, { css } from 'styled-components';

const HAMBURGER_WIDTH = '35px';

const HamburgerContainer = styled.div`
    width: ${HAMBURGER_WIDTH};
    position: relative;
`;

const HamburgerBar = styled.span`
    position: absolute;
    border-radius: 2px;
    width: 25px;
    height: 2px;
    display: block;
    background: ${props => props.theme.navigation.hamburgerColor};
    transition: top 0.5s, transform 0.5s, background 0.5s;
    top: 0;

    &:nth-child(2) {
        top: 6px;
    }

    &:nth-child(3) {
        top: 12px;
    }

    ${props =>
        props.menuOpen
            ? css`
                  &:first-child {
                      transform: rotate(45deg);
                      top: 6px;
                  }

                  &:nth-child(2) {
                      display: none;
                  }

                  &:last-child {
                      transform: rotate(-45deg);
                      top: 6px;
                  }
              `
            : null}
`;

export const Hamburger = ({ onClick, menuOpen, ...props }) => (
    <HamburgerContainer onClick={onClick} {...props}>
        <HamburgerBar menuOpen={menuOpen} />
        <HamburgerBar menuOpen={menuOpen} />
        <HamburgerBar menuOpen={menuOpen} />
    </HamburgerContainer>
);

Hamburger.propTypes = {
    onClick: propTypes.func,
    menuOpen: propTypes.bool
};

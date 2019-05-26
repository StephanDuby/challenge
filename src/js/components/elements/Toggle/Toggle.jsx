import React from 'react';
import propTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { device } from '../../../helpers/viewportSizes';

const ToggleContainer = styled.div`
    height: 34px;
    width: 84px;
    border-radius: 17px;
    background: ${props => props.theme.toggle.backgroundColor};
    position: relative;
    cursor: pointer;

    @media ${device.medium} {
        position: absolute;
        top: 10px;
        right: 0;
    }
`;

const ToggleButton = styled.div`
    width: 40px;
    height: 30px;
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 15px;
    background: ${props => props.theme.toggle.buttonColor};
    transition: left 0.2s, right 0.2s;

    ${props =>
        props.toggleValue === 1
            ? css`
                  left: 42px;
              `
            : null};
`;

const ToggleValue = styled.div`
    width: 42px;
    height: 34px;
    position: absolute;
    pointer-events: none;
    left: 0;
    text-align: center;

    &:last-child {
        right: 0;
        left: auto;
    }
`;

const StyledIcon = styled(FontAwesomeIcon)`
    height: 34px;
    line-height: 34px;
    transition: color 0.2s;

    ${props =>
        props.inactive
            ? css`
                  color: ${props => props.theme.lightTextColor};
              `
            : null}
`;

export const Toggle = ({ toggleValue, onClickToggle }) => (
    <ToggleContainer onClick={onClickToggle}>
        <ToggleButton toggleValue={toggleValue} />
        <ToggleValue>
            <StyledIcon icon={faChartPie} inactive={toggleValue !== 0} />
        </ToggleValue>
        <ToggleValue>
            <StyledIcon icon={faChartBar} inactive={toggleValue !== 1} />
        </ToggleValue>
    </ToggleContainer>
);

Toggle.propTypes = {
    options: propTypes.arrayOf(
        propTypes.shape({
            icon: propTypes.string,
            value: propTypes.string
        })
    ),
    toggleValue: propTypes.number,
    onClickToggle: propTypes.func
};

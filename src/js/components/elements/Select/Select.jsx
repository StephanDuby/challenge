import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

console.log('faChevronDown', faChevronDown);

const StyledSelect = styled.select`
    border: none;
    border-radius: 6px;
    background: ${props => props.theme.select.background};
    appearance: none;
    height: 34px;
    padding: 5px 32px 5px 12px;

    &:before {
        content: '${faChevronDown.icon[4]}';
        font-family: FontAwesome;
        position: absolute;
        right: 12px;
        top: 0;
        height: 34px;
        line-height: 34px;
        display: block;
    }

    &:focus {
        outline: none;
    }
`;

export const Select = ({ options }) => (
    <StyledSelect>
        {options.map(item => (
            <option key={item} value={item}>
                {item}
            </option>
        ))}
    </StyledSelect>
);

Select.propTypes = {
    options: propTypes.array
};

import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const HEIGHT = 34;
const UNIT = 'px';

const SelectContainer = styled.div`
    display: inline-block;
    border-radius: 6px;
    background: ${props => props.theme.select.background};
    height: ${HEIGHT + UNIT};
    cursor: pointer;
    position: relative;
`;

const StyledSelect = styled.select`
    width: 100%;
    border: none;
    background: transparent;
    appearance: none;
    height: ${HEIGHT + UNIT};
    padding:  0 40px 0 ${props => props.theme.defaultPadding};
    
    &::-ms-expand {
        display; none;
    }

    &:focus {
        outline: none;
    }
`;

const StyledIcon = styled(FontAwesomeIcon)`
    position: absolute;
    line-height: ${HEIGHT + 10 + UNIT};
    right: 15px;
    top: 11px;
    color: ${props => props.theme.brandPrimaryColor};
    pointer-events: none;
`;

export const Select = ({ options, ...props }) => (
    <SelectContainer {...props}>
        <StyledIcon icon={faChevronDown} />
        <StyledSelect>
            {options.map(item => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </StyledSelect>
    </SelectContainer>
);

Select.propTypes = {
    options: propTypes.arrayOf(propTypes.string)
};

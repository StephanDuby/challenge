import React from 'react';
import propTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export const BasicTable = styled.table`
    margin: 0;
    border-spacing: 0;
    border-collapse: collapse;
    cursor: default;
    min-width: 100%;
`;

export const TableHead = styled.thead`
    background-color: ${props => props.theme.table.headerBgColor};
    color: ${props => props.theme.table.headerTextColor};
`;

export const TableBody = ({ children }) => <tbody>{children}</tbody>;

TableBody.propTypes = {
    children: propTypes.node
};

export const TableRow = styled.tr`
    margin: 0;
`;

const HeadCellOuter = styled.th`
    padding: 0 13px;
    height: 50px;
    margin: 0;
    white-space: nowrap;
    font-size: ${props => props.theme.table.headerFontSize};
    text-align: left;
    cursor: pointer;

    ${props =>
        props.activeSort &&
        css`
            svg {
                color: ${props => props.theme.brandPrimaryColor};
            }
        `}
`;

export const StyledIcon = styled(FontAwesomeIcon)`
    margin-left: ${props => props.theme.defaultMargin};
    color: ${props => props.theme.table.inactiveTextColor};
    pointer-events: none;
`;

export const HeadCell = ({ children, activeSort, sortable, order, ...rest }) => (
    <HeadCellOuter {...rest} activeSort={activeSort}>
        {children}
        {sortable && <StyledIcon icon={order === 'asc' ? faChevronDown : faChevronUp} />}
    </HeadCellOuter>
);

HeadCell.propTypes = {
    activeSort: propTypes.bool,
    children: propTypes.node,
    order: propTypes.oneOf(['asc', 'desc']),
    sortable: propTypes.bool
};

export const Cell = styled.td`
    padding: 0 13px;
    height: 54px;
    margin: 0;
    font-family: ${props => props.theme.defaultFont};
    font-size: ${props => props.theme.table.cellFontSize};
    vertical-align: 'middle';
    white-space: nowrap;
`;

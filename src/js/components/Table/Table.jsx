import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const BasicTable = styled.table`
    margin: 0;
    border-spacing: 0;
    border-collapse: collapse;
    cursor: default;
    min-width: 100%;

    ${props =>
        props.width
            ? css`
                  max-width: ${props => props.width};
              `
            : null}
`;

BasicTable.propTypes = {
    className: propTypes.string,
    width: propTypes.string
};

export const TableHead = styled.thead`
    background-color: ${props => props.theme.table.headerBgColor};
    color: ${props => props.theme.table.headerTextColor};
`;

export const TableBody = ({ children }) => <tbody>{children}</tbody>;

TableBody.propTypes = {
    children: propTypes.node
};

class TableRowComponent extends PureComponent {

    static propTypes = {
        className: propTypes.string,
        children: propTypes.any,
        onClick: propTypes.func,
        row: propTypes.object
    };

    handleClickTableRow = () => {
        const { onClick } = this.props;
        onClick && onClick(this.props.row);
    };

    render() {
        return (
            <tr className={this.props.className} onClick={this.handleClickTableRow}>
                {this.props.children}
            </tr>
        );
    }

}

export const TableRow = styled(TableRowComponent)`
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
`;

export const StyledIcon = styled(FontAwesomeIcon)`
    margin-left: 5px;
    color: ${props => props.theme.brandPrimaryColor};
    pointer-events: none;
`;

export const HeadCell = ({ children, order, ...rest }) => (
    <HeadCellOuter {...rest} order={order}>
        {children}
        <StyledIcon icon={faChevronDown} />
    </HeadCellOuter>
);

HeadCell.propTypes = {
    align: propTypes.oneOf(['left', 'center', 'right']),
    children: propTypes.node,
    order: propTypes.oneOf(['asc', 'desc', 'none']),
    width: propTypes.number
};

export const Cell = styled.td`
  padding: 0 13px;
  height: 54px;
  margin: 0;
  font-family: ${props => props.theme.defaultFont};
  font-size: ${props => props.theme.table.cellFontSize};
  vertical-align: ${props => props.vAlign || 'middle'};
  white-space: nowrap;

  ${props =>
        props.width
            ? css`
                max-width: ${props => props.width};
            `
            : null}
  ${props =>
        props.align
            ? css`
                text-align: ${props.align};
            `
            : null}
  
  ${props =>
        props.noWrap
            ? css`
                white-space: nowrap;
            `
            : null}
  
  ${props =>
        props.ellipsis
            ? css`
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            `
            : null}
`;

Cell.propTypes = {
    align: propTypes.oneOf(['left', 'center', 'right']),
    vAlign: propTypes.oneOf(['top', 'middle', 'bottom']),
    noWrap: propTypes.bool,
    width: propTypes.string
};

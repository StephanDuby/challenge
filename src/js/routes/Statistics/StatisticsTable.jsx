import React from 'react';
import propTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';
import { BasicTable, TableHead, TableRow, HeadCell, TableBody, Cell, StyledIcon } from '../../components/Table/Table';
import { sortDataByColumn } from '../../helpers/dataHelper';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const ASC = 'asc';
const DESC = 'desc';

const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    background: #fff;
    border-radius: 5px;
`;

const SubTableRow = styled(TableRow)`
    display: none;
    ${props =>
        props.open
            ? css`
                  display: table-row;
              `
            : null};
`;

const CellContentHeader = styled.span`
    display: block;
    font-size: 13px;
    color: ${props => props.theme.brandPrimaryColor};
`;

const StyledIconContainer = styled.div`
    cursor: pointer;
`;

const StyledIconNoClick = styled(StyledIcon)`
    pointer-events: none;
`;

class StatisticsTableBase extends React.Component {

    state = {
        openRows: [],
        tableData: this.props.tableData,
        sortColumn: {
            column: 'batch',
            direction: 'asc'
        }
    };

    handleSortTableByColumn = event => {
        const column = event.target.dataset.column;
        const currentSort = this.state.sortColumn;
        const sortDirection = column === currentSort.column ? (currentSort.direction === ASC ? DESC : ASC) : ASC;
        const tableData = sortDataByColumn(this.props.tableData, column, sortDirection);
        const sortColumn = {
            column,
            direction: sortDirection
        };
        this.setState({
            tableData,
            sortColumn
        });
    };

    handleClickOpenRow = event => {
        const rowUuid = event.target.dataset.rowUuid;
        let openRows = this.state.openRows.slice(0); // slice to clone and not manipulate state directly
        const idx = openRows.indexOf(rowUuid);
        if (idx !== -1) {
            openRows.splice(idx, 1);
        } else {
            openRows.push(rowUuid);
        }
        this.setState({
            openRows
        });
    };

    render() {
        const { openRows, tableData, sortColumn } = this.state;
        const { intl } = this.props;
        return (
            <TableContainer>
                <BasicTable>
                    <TableHead>
                        <TableRow>
                            <HeadCell
                                data-column={'batch'}
                                activeSort={sortColumn.column === 'batch'}
                                order={sortColumn.column === 'batch' ? sortColumn.direction : ASC}
                                onClick={this.handleSortTableByColumn}
                                sortable={true}
                            >
                                {intl.formatMessage({ id: 'batch' })}
                            </HeadCell>
                            <HeadCell
                                data-column={'dosage'}
                                activeSort={sortColumn.column === 'dosage'}
                                order={sortColumn.column === 'dosage' ? sortColumn.direction : ASC}
                                onClick={this.handleSortTableByColumn}
                                sortable={true}
                            >
                                {intl.formatMessage({ id: 'dosage' })}
                            </HeadCell>
                            <HeadCell
                                data-column={'defect'}
                                activeSort={sortColumn.column === 'defect'}
                                order={sortColumn.column === 'defect' ? sortColumn.direction : ASC}
                                onClick={this.handleSortTableByColumn}
                                sortable={true}
                            >
                                {intl.formatMessage({ id: 'defects' })}
                            </HeadCell>
                            <HeadCell
                                data-column={'timestamp'}
                                activeSort={sortColumn.column === 'timestamp'}
                                order={sortColumn.column === 'timestamp' ? sortColumn.direction : ASC}
                                onClick={this.handleSortTableByColumn}
                                sortable={true}
                            >
                                {intl.formatMessage({ id: 'timestamp' })}
                            </HeadCell>
                            <HeadCell>&nbsp;</HeadCell>
                        </TableRow>
                    </TableHead>
                    {tableData.map((item, index) => (
                        <TableBody key={item.uuid}>
                            <TableRow>
                                <Cell>{item.batch}</Cell>
                                <Cell>{item.dosage}</Cell>
                                <Cell>{item.defect}</Cell>
                                <Cell>{item.timestamp}</Cell>
                                <Cell>
                                    <StyledIconContainer data-row-uuid={item.uuid} onClick={this.handleClickOpenRow}>
                                        <StyledIconNoClick icon={faChevronDown} />
                                    </StyledIconContainer>
                                </Cell>
                            </TableRow>
                            <SubTableRow open={openRows.includes(item.uuid)}>
                                <Cell>
                                    <div>
                                        <CellContentHeader>{intl.formatMessage({ id: 'topStamp' })}</CellContentHeader>
                                        {item['top-stamp']}
                                    </div>
                                </Cell>
                                <Cell>
                                    <div>
                                        <CellContentHeader>
                                            {intl.formatMessage({ id: 'bottomStamp' })}
                                        </CellContentHeader>
                                        {item['bottom-stamp']}
                                    </div>
                                </Cell>
                            </SubTableRow>
                        </TableBody>
                    ))}
                </BasicTable>
            </TableContainer>
        );
    }

}

StatisticsTableBase.propTypes = {
    tableData: propTypes.array,
    intl: intlShape.isRequired
};

export const StatisticsTable = injectIntl(StatisticsTableBase);

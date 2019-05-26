import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { PageContainer, PageHeader, PageBody } from '../../components/PageLayout/PageLayout';
import { Toggle } from '../../components/elements/Toggle/toggle';
import { Select } from '../../components/elements/Select/Select';
import { PieChart } from '../../components/charts/PieChart/PieChart';
import { StatisticsTable } from './StatisticsTable';
import { device } from '../../helpers/viewportSizes';

const StyledPageHeader = styled(PageHeader)`
    @media ${device.large} {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
`;

const Headline = styled.h1`
    font-size: 30px;
    font-family: ${props => props.theme.specialFont};
    color: ${props => props.theme.brandSecondaryColor};
    text-transform: uppercase;
    margin-bottom: ${props => props.theme.defaultMargin};
`;

const MachineStatus = styled.div`
    height: 34px;
    line-height: 34px;
    margin-bottom: ${props => props.theme.defaultMargin};
`;

const MachineStatusIndicator = styled.div`
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: ${props => props.theme.statusIndicator.activeColor};
    margin-left: ${props => props.theme.defaultMargin};
    margin-right: 3px;
`;

const MachineName = styled.span`
    font-weight: bold;
`;

const FilterBar = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const FilterSelect = styled(Select)`
    display: inline-block;
    width: 100%;
    margin-bottom: ${props => props.theme.defaultMargin};

    @media ${device.medium} {
        width: 45%;
        margin-left: 5%;

        &:nth-child(odd) {
            margin-left: 0;
        }
    }

    @media ${device.large} {
        width: auto;
        margin-left: ${props => props.theme.defaultMargin};

        &:nth-child(odd) {
            margin-left: ${props => props.theme.defaultMargin};
        }

        &:first-child {
            margin-left: 0;
        }
    }
`;

export const defectShape = propTypes.shape({
    defect: propTypes.string,
    count: propTypes.number,
    color: propTypes.string,
    percentage: propTypes.number
});

export const Statistics = ({ filterData, pieChartData, tableData, toggleValue, onClickToggle }) => (
    <PageContainer>
        <StyledPageHeader>
            <MachineStatus>
                Machine <MachineStatusIndicator />
                <MachineName>XB3421</MachineName>
            </MachineStatus>
            <FilterBar>
                <FilterSelect options={filterData.monthFilterValues} />
                <FilterSelect options={filterData.dosageFilterValues} />
                <FilterSelect options={filterData.stampFilterValues} />
                <FilterSelect options={filterData.batchFilterValues} />
            </FilterBar>
        </StyledPageHeader>
        <PageBody>
            <Headline>Defect Statistics</Headline>
            <Toggle toggleValue={toggleValue} onClickToggle={onClickToggle} />
            <PieChart pieChartData={pieChartData} />
            <StatisticsTable tableData={tableData} />
        </PageBody>
    </PageContainer>
);

Statistics.propTypes = {
    pieChartData: propTypes.shape({
        aggregatedDefects: propTypes.arrayOf(defectShape)
    }),
    tableData: propTypes.array,
    filterData: propTypes.shape({
        monthFilterValues: propTypes.arrayOf(propTypes.string),
        dosageFilterValues: propTypes.arrayOf(propTypes.string),
        stampFilterValues: propTypes.arrayOf(propTypes.string),
        batchFilterValues: propTypes.arrayOf(propTypes.string)
    }),
    toggleValue: propTypes.number,
    onClickToggle: propTypes.func
};

import React from 'react';
import styled from 'styled-components';
import { PageContainer, PageHeader, PageBody } from '../../components/PageLayout/PageLayout';
import { Select } from '../../components/elements/Select/Select';
import { PieChart } from '../../components/charts/PieChart/PieChart';
import { device } from '../../helpers/viewportSizes';
import { aggregateData } from '../../helpers/dataHelper';
import { data, optionsFilterA, optionsFilterB, optionsFilterC, optionsFilterD } from '../../mock/pieChartData';

const StyledPageHeader = styled(PageHeader)`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Headline = styled.h1`
    font-size: 30px;
    font-family: ${props => props.theme.specialFont};
    color: ${props => props.theme.brandSecondaryColor};
    text-transform: uppercase;
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
        width: auto;
        margin-left: ${props => props.theme.defaultMargin};

        &:first-child {
            margin-left: none;
        }
    }
`;

export class Statistics extends React.Component {

    render() {
        // generate chart data from raw data
        const pieChartData = aggregateData(data.defects, 'defect');
        return (
            <PageContainer>
                <StyledPageHeader>
                    <MachineStatus>
                        Machine <MachineStatusIndicator />
                        <MachineName>XB3421</MachineName>
                    </MachineStatus>
                    <FilterBar>
                        <FilterSelect options={optionsFilterA} />
                        <FilterSelect options={optionsFilterB} />
                        <FilterSelect options={optionsFilterC} />
                        <FilterSelect options={optionsFilterD} />
                    </FilterBar>
                </StyledPageHeader>
                <PageBody>
                    <Headline>Defect Statistics</Headline>
                    <PieChart pieChartData={pieChartData} />
                    <div>TODO: table</div>
                </PageBody>
            </PageContainer>
        );
    }

}

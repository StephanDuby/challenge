import React from 'react';
import styled from 'styled-components';
import { PageContainer, PageHeader, PageBody } from '../../components/PageLayout/PageLayout';
import { Select } from '../../components/elements/Select/Select';
import { PieChart } from '../../components/charts/PieChart/PieChart';
import { optionsFilterA } from '../../mock/pieChartData';

const StyledPageHeader = styled(PageHeader)`
    display: flex;
    justify-content: space-between;
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

export class Statistics extends React.Component {

    render() {
        return (
            <PageContainer>
                <StyledPageHeader>
                    <MachineStatus>
                        Machine <MachineStatusIndicator />
                        <MachineName>XB3421</MachineName>
                    </MachineStatus>
                    <div>
                        <Select options={optionsFilterA} />
                    </div>
                </StyledPageHeader>
                <PageBody>
                    <Headline>Defect Statistics</Headline>
                    <PieChart />
                    <div>TODO: table</div>
                </PageBody>
            </PageContainer>
        );
    }

}

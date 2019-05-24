import React from 'react';
import {
    PageContainer,
    PageHeader,
    PageBody
} from '../../components/PageLayout/PageLayout';
import { PieChart } from '../../components/charts/PieChart/PieChart';

export class Statistics extends React.Component {

    render() {
        return (
            <PageContainer>
                <PageHeader>page header info</PageHeader>
                <PageBody>
                    <PieChart />
                </PageBody>
            </PageContainer>
        );
    }

}

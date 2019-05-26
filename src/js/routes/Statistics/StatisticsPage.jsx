import React from 'react';
import { Statistics } from './Statistics';
import { aggregateData, getFilterValuesFromData, prepareDataForTable } from '../../helpers/dataHelper';
import { data } from '../../mock/pieChartData';

// generate chart data from raw data
const pieChartData = aggregateData(data.defects, 'defect');
const filterData = getFilterValuesFromData(data.defects);
const tableData = prepareDataForTable(data.defects);

export const PIE_VIEW = 'pie';
export const BAR_VIEW = 'bar';

export class StatisticsPage extends React.Component {

    state = {
        toggleValue: PIE_VIEW
    };

    handleClickToggle = () => {
        this.setState(state => ({
            toggleValue: state.toggleValue === PIE_VIEW ? BAR_VIEW : PIE_VIEW
        }));
    };

    render() {
        const { toggleValue } = this.state;
        return (
            <Statistics
                pieChartData={pieChartData}
                tableData={tableData}
                filterData={filterData}
                toggleValue={toggleValue}
                onClickToggle={this.handleClickToggle}
            />
        );
    }

}

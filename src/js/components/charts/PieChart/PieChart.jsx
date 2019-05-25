import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { device } from '../../../helpers/viewportSizes';
import {
    PieChartSVG,
    RADIUS,
    BAR_THICKNESS,
    BAR_ANGLE_FACTOR,
    CHART_PADDING,
    BAR_THICKNESS_ACTIVE,
    CHART_BASE,
    MEASURE_UNIT
} from './PieChartSVG';
import { ChartLegend } from './ChartLegend';
import {
    calulateSegmentPath,
    calculateStartChunkPath,
    calculateEndChunkPath,
    calculateActiveSegmentPath,
    calculateButtonPositionOnActiveSegment
} from '../../../helpers/dataHelper';

const ChartContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const GraphContainer = styled.div`
    height: ${CHART_BASE + MEASURE_UNIT};
    flex: 1 0;
    width: 100%;
    min-width: 320px;
    max-width: 100%;
    position: relative;

    @media ${device.medium} {
        max-width: 40%;
    }
`;

const LegendContainer = styled.div`
    flex: 1;
    padding: ${CHART_PADDING + MEASURE_UNIT};
`;

export class PieChart extends React.Component {

    state = {
        activeDataIndex: null
    };

    handleClickSegment = event => {
        const activeDataIndex = parseInt(event.target.dataset.item);
        this.setState({
            activeDataIndex
        });
    };

    handleCloseActiveSegment = () => {
        this.setState({
            activeDataIndex: null
        });
    };

    render() {
        const { activeDataIndex } = this.state;
        const { pieChartData } = this.props;
        let startAngle = 0;

        const chartSegments = {
            startChunks: [],
            endChunks: [],
            paths: [],
            colors: []
        };

        let activeData = null;
        let activeSegment = null;
        let activeSegmentButton = null;

        pieChartData.aggregatedDefects.forEach((item, index) => {
            const segmentAngle = (item.count * Math.PI * 2) / pieChartData.total;
            let calculationParameters = {
                radiusS: RADIUS - BAR_THICKNESS,
                radiusL: RADIUS,
                barThickness: BAR_THICKNESS,
                angleFactor: BAR_ANGLE_FACTOR,
                startAngle,
                endAngle: startAngle + segmentAngle,
                positioningFactor: CHART_PADDING
            };

            chartSegments.startChunks.push(calculateStartChunkPath(calculationParameters));
            chartSegments.endChunks.push(calculateEndChunkPath(calculationParameters));
            chartSegments.paths.push(calulateSegmentPath(calculationParameters));
            chartSegments.colors.push(item.color);

            if (index === activeDataIndex) {
                activeData = pieChartData.aggregatedDefects[index];
                calculationParameters.radiusS = RADIUS - BAR_THICKNESS_ACTIVE;
                calculationParameters.barThickness = BAR_THICKNESS_ACTIVE;
                // calculationParameters.angleFactor = BAR_ANGLE_FACTOR_ACTIVE;
                activeSegment = {
                    path: calculateActiveSegmentPath(calculationParameters),
                    color: item.color
                };

                activeSegmentButton = {
                    position: calculateButtonPositionOnActiveSegment(calculationParameters),
                    radius: BAR_THICKNESS
                };
            }

            startAngle += segmentAngle;
        });

        return (
            <ChartContainer>
                <GraphContainer>
                    <PieChartSVG
                        pieChartData={pieChartData}
                        chartSegments={chartSegments}
                        activeData={activeData}
                        activeSegment={activeSegment}
                        activeSegmentButton={activeSegmentButton}
                        onClickSegment={this.handleClickSegment}
                        onCloseActiveSegment={this.handleCloseActiveSegment}
                    />
                </GraphContainer>
                <LegendContainer>
                    <ChartLegend pieChartData={pieChartData} activeDataIndex={activeDataIndex} />
                </LegendContainer>
            </ChartContainer>
        );
    }

}

PieChart.propTypes = {
    pieChartData: propTypes.object
};

import React from 'react';
import styled from 'styled-components';
import {
    aggregateData,
    calulateSegmentPath,
    calculateStartChunkPath,
    calculateEndChunkPath,
    calculateActiveSegmentPath,
    calculateButtonPositionOnActiveSegment
} from './dataHelper';
import { data } from '../../../mock/pieChartData';
import { device } from '../../../helpers/viewportSizes';

const CHART_BASE = 320;
const CHART_PADDING = 30;
const CHART_HEIGHT = CHART_BASE - 2 * CHART_PADDING;
const MEASURE_UNIT = 'px';
const CENTER = CHART_BASE / 2;
const RADIUS = CHART_HEIGHT / 2;
const BAR_THICKNESS = 25;
const BAR_THICKNESS_ACTIVE = 35;
const BAR_ANGLE_FACTOR = (BAR_THICKNESS / CHART_HEIGHT) * 2;

const ChartContainer = styled.div`
    width: 100%;
    height: ${CHART_BASE + MEASURE_UNIT};
    display: flex;
    flex-wrap: wrap;
`;

const GraphContainer = styled.div`
    height: ${CHART_BASE + MEASURE_UNIT};
    flex: 1 0;
    width: 100%;
    min-width: 320px;
    max-width: 100%;

    @media ${device.medium} {
        max-width: 40%;
    }
`;

const LegendContainer = styled.div`
    flex: 1;
    padding: ${CHART_PADDING + MEASURE_UNIT};
`;

const SVGContainer = styled.svg`
    transform: scale(1, -1);
`;

const PieSegment = styled.path`
    cursor: pointer;
`;

const CircleMask = styled.circle`
    pointer-events: none;
`;

const ActiveElementButton = styled.circle`
    cursor: pointer;
`;

const ActiveElementButtonPath = styled.path`
    pointer-events: none;
`;

// generate chart data from raw data
const pieChartData = aggregateData(data.defects, 'defect');

export class PieChart extends React.Component {

    state = {
        activeSegment: null
    };

    handleClickSegment = event => {
        const activeSegment = parseInt(event.target.dataset.item);
        this.setState({
            activeSegment
        });
    };

    handleCloseActiveSegment = () => {
        this.setState({
            activeSegment: null
        });
    };

    render() {
        const { activeSegment } = this.state;
        let startAngle = 0;
        const svgElements = {
            startChunks: [],
            endChunks: [],
            paths: [],
            colors: []
        };

        let activeElement = null;
        let activeElementButton = null;

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

            svgElements.startChunks.push(calculateStartChunkPath(calculationParameters));
            svgElements.endChunks.push(calculateEndChunkPath(calculationParameters));
            svgElements.paths.push(calulateSegmentPath(calculationParameters));
            svgElements.colors.push(item.color);

            if (index === activeSegment) {
                calculationParameters.radiusS = RADIUS - BAR_THICKNESS_ACTIVE;
                calculationParameters.barThickness = BAR_THICKNESS_ACTIVE;
                // calculationParameters.angleFactor = BAR_ANGLE_FACTOR_ACTIVE;
                activeElement = {
                    path: calculateActiveSegmentPath(calculationParameters),
                    color: item.color
                };

                activeElementButton = {
                    position: calculateButtonPositionOnActiveSegment(calculationParameters),
                    radius: BAR_THICKNESS
                };
            }

            startAngle += segmentAngle;
        });

        return (
            <ChartContainer>
                <GraphContainer>
                    <SVGContainer width={'100%'} height={'100%'} viewBox={`0 0 ${CHART_BASE} ${CHART_BASE}`}>
                        {svgElements.startChunks.map((path, index) => (
                            <PieSegment
                                key={`start_${index}`}
                                fill={svgElements.colors[index]}
                                d={path}
                                onClick={this.handleClickSegment}
                                data-item={index}
                                soften={activeElement}
                            />
                        ))}
                        {svgElements.paths.map((path, index) => (
                            <PieSegment
                                key={`middle_${index}`}
                                fill={svgElements.colors[index]}
                                d={path}
                                onClick={this.handleClickSegment}
                                data-item={index}
                                soften={activeElement}
                            />
                        ))}
                        {svgElements.endChunks.map((path, index) => (
                            <PieSegment
                                key={`end_${index}`}
                                fill={svgElements.colors[index]}
                                d={path}
                                onClick={this.handleClickSegment}
                                data-item={index}
                                soften={activeElement}
                            />
                        ))}
                        {activeElement && (
                            <>
                                <CircleMask cx={CENTER} cy={CENTER} r={RADIUS} fill={'rgba(255, 255, 255, 0.6)'} />
                                <PieSegment fill={activeElement.color} d={activeElement.path} />
                                <ActiveElementButton
                                    cx={activeElementButton.position.x}
                                    cy={activeElementButton.position.y}
                                    r={activeElementButton.radius}
                                    fill={'rgba(255, 255, 255, 0.8)'}
                                    onClick={this.handleCloseActiveSegment}
                                />
                                <ActiveElementButtonPath
                                    d={`M${activeElementButton.position.x -
                                        activeElementButton.radius / 3} ${activeElementButton.position.y -
                                        activeElementButton.radius / 3} L ${activeElementButton.position.x +
                                        activeElementButton.radius / 3} ${activeElementButton.position.y +
                                        activeElementButton.radius / 3}`}
                                    stroke={'#7D7D7D'}
                                    onClick={this.handleCloseActiveSegment}
                                />
                                <ActiveElementButtonPath
                                    d={`M${activeElementButton.position.x +
                                        activeElementButton.radius / 3} ${activeElementButton.position.y -
                                        activeElementButton.radius / 3} L ${activeElementButton.position.x -
                                        activeElementButton.radius / 3} ${activeElementButton.position.y +
                                        activeElementButton.radius / 3}`}
                                    stroke={'#7D7D7D'}
                                    onClick={this.handleCloseActiveSegment}
                                />
                            </>
                        )}
                    </SVGContainer>
                </GraphContainer>
                <LegendContainer>
                    <div>{pieChartData.total} defects</div>
                    <div>
                        {pieChartData.aggregatedDefects.map(item => (
                            <div key={item.defect}>
                                {item.defect}
                                {item.count}
                                {item.color}
                            </div>
                        ))}
                    </div>
                </LegendContainer>
            </ChartContainer>
        );
    }

}

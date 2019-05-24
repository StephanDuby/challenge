import React from 'react';
import styled from 'styled-components';
import { lightenColor } from '../../../helpers/colorHelper';
import {
    aggregateData,
    calulateSegmentPath,
    calculateStartChunkPath,
    calculateEndChunkPath,
    calculateActiveSegmentPath
} from './dataHelper';
import { data } from '../../../mock/pieChartData';

const CHART_HEIGHT = 300;
const HEIGHT_UNIT = 'px';
const CENTER = CHART_HEIGHT / 2;
const RADIUS = CENTER;
const BAR_THICKNESS = 25;
const BAR_THICKNESS_ACTIVE = 35;
const BAR_ANGLE_FACTOR = (BAR_THICKNESS / CHART_HEIGHT) * 2;

const ChartContainer = styled.div`
    width: 100%;
    height: ${CHART_HEIGHT + HEIGHT_UNIT};
    display: flex;
`;

const GraphContainer = styled.div`
    height: ${CHART_HEIGHT + HEIGHT_UNIT};
    flex: 1;
    max-width: 50%;
`;

const LegendContainer = styled.div`
    flex: 1;
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

        pieChartData.aggregatedDefects.forEach((item, index) => {
            const segmentAngle = (item.count * Math.PI * 2) / pieChartData.total;
            let calculationParameters = {
                radiusS: RADIUS - BAR_THICKNESS,
                radiusL: RADIUS,
                barThickness: BAR_THICKNESS,
                angleFactor: BAR_ANGLE_FACTOR,
                startAngle,
                endAngle: startAngle + segmentAngle
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
            }

            startAngle += segmentAngle;
        });

        return (
            <ChartContainer>
                <GraphContainer>
                    <SVGContainer width={'100%'} height={'100%'} viewBox={`0 0 ${CHART_HEIGHT} ${CHART_HEIGHT}`}>
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
                            </>
                        )}
                    </SVGContainer>
                </GraphContainer>
                <LegendContainer>here are the legends</LegendContainer>
            </ChartContainer>
        );
    }

}

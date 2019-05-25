import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

export const CHART_BASE = 320;
export const CHART_PADDING = 30;
export const CHART_HEIGHT = CHART_BASE - 2 * CHART_PADDING;
export const MEASURE_UNIT = 'px';
export const CENTER = CHART_BASE / 2;
export const RADIUS = CHART_HEIGHT / 2;
export const BAR_THICKNESS = 25;
export const BAR_THICKNESS_ACTIVE = 35;
export const BAR_ANGLE_FACTOR = (BAR_THICKNESS / CHART_HEIGHT) * 2;

const PieSegment = styled.path`
    cursor: pointer;
`;

const CircleMask = styled.circle`
    pointer-events: none;
`;

const ActiveSegmentButton = styled.circle`
    cursor: pointer;
`;

const ActiveSegmentButtonPath = styled.path`
    pointer-events: none;
`;

const ChartText = styled.div`
    width: ${CHART_HEIGHT - 3 * CHART_PADDING + MEASURE_UNIT};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    left: 0;
    right: 0;
    text-align: center;
    color: '#F00';
`;

const ChartTextSpan = styled.div`
    display: block;
    font-size: 14px;
    color: ${props => props.theme.lightTextColor};
`;

const ChartTextSpecial = styled(ChartTextSpan)`
    font-family: ${props => props.theme.specialFont};
    font-size: 40px;
    height: 40px;
    line-height: 30px;
    color: ${props => props.theme.brandSecondaryColor};
`;

export const PieChartSVG = ({
    chartSegments,
    activeData,
    activeSegment,
    activeSegmentButton,
    pieChartData,
    onClickSegment,
    onCloseActiveSegment
}) => {
    return (
        <>
            <svg width={'100%'} height={'100%'} viewBox={`0 0 ${CHART_BASE} ${CHART_BASE}`}>
                {chartSegments.startChunks.map((path, index) => (
                    <PieSegment
                        key={`start_${index}`}
                        fill={chartSegments.colors[index]}
                        d={path}
                        onClick={onClickSegment}
                        data-item={index}
                    />
                ))}
                {chartSegments.paths.map((path, index) => (
                    <PieSegment
                        key={`middle_${index}`}
                        fill={chartSegments.colors[index]}
                        d={path}
                        onClick={onClickSegment}
                        data-item={index}
                    />
                ))}
                {chartSegments.endChunks.map((path, index) => (
                    <PieSegment
                        key={`end_${index}`}
                        fill={chartSegments.colors[index]}
                        d={path}
                        onClick={onClickSegment}
                        data-item={index}
                    />
                ))}
                {activeSegment && (
                    <>
                        <CircleMask cx={CENTER} cy={CENTER} r={RADIUS} fill={'rgba(255, 255, 255, 0.6)'} />
                        <PieSegment fill={activeSegment.color} d={activeSegment.path} />
                        <ActiveSegmentButton
                            cx={activeSegmentButton.position.x}
                            cy={activeSegmentButton.position.y}
                            r={activeSegmentButton.radius}
                            fill={'rgba(255, 255, 255, 0.8)'}
                            onClick={onCloseActiveSegment}
                        />
                        <ActiveSegmentButtonPath
                            d={`M${activeSegmentButton.position.x -
                                activeSegmentButton.radius / 3} ${activeSegmentButton.position.y -
                                activeSegmentButton.radius / 3} L ${activeSegmentButton.position.x +
                                activeSegmentButton.radius / 3} ${activeSegmentButton.position.y +
                                activeSegmentButton.radius / 3}`}
                            stroke={'#7D7D7D'}
                            onClick={onCloseActiveSegment}
                        />
                        <ActiveSegmentButtonPath
                            d={`M${activeSegmentButton.position.x +
                                activeSegmentButton.radius / 3} ${activeSegmentButton.position.y -
                                activeSegmentButton.radius / 3} L ${activeSegmentButton.position.x -
                                activeSegmentButton.radius / 3} ${activeSegmentButton.position.y +
                                activeSegmentButton.radius / 3}`}
                            stroke={'#7D7D7D'}
                            onClick={onCloseActiveSegment}
                        />
                    </>
                )}
            </svg>
            <ChartText>
                {!activeData ? (
                    'Choose a section for further details'
                ) : (
                    <div>
                        <ChartTextSpan>{activeData.defect}</ChartTextSpan>
                        <ChartTextSpecial>{activeData.percentage} %</ChartTextSpecial>
                        <ChartTextSpan>({activeData.count} defects)</ChartTextSpan>
                    </div>
                )}
            </ChartText>
        </>
    );
};

PieChartSVG.propTypes = {
    pieChartData: propTypes.object,
    activeData: propTypes.object,
    chartSegments: propTypes.object,
    activeSegment: propTypes.object,
    activeSegmentButton: propTypes.object,
    onClickSegment: propTypes.func,
    onCloseActiveSegment: propTypes.func
};

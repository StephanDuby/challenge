import React from 'react';
import propTypes from 'prop-types';
import styled, { css } from 'styled-components';

const LegendHeader = styled.div`
    margin-bottom: ${props => props.theme.defaultMargin};
`;

const LegendHeaderNumber = styled.span`
    font-size: 50px;
    font-family: ${props => props.theme.specialFont};
    color: ${props => props.theme.brandSecondaryColor};
`;

const DefectList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const DefectItem = styled.div`
    flex: 1;
    min-width: 320px;
    height: 35px;
    line-height: 35px;

    ${props =>
        props.inactive
            ? css`
                  color: ${props.theme.lightTextColor};
              `
            : null}
`;

const ColorSwatch = styled.div`
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 3px;
    background: ${props => props.theme.defaultTextColor};
    margin-right: ${props => props.theme.defaultMargin};
    position: relative;

    ${props =>
        props.color &&
        css`
            background: ${props.color};
        `}

    ${props =>
        props.inactive
            ? css`
                  &:after {
                      content: '';
                      background: rgba(255, 255, 255, 0.6);
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 15px;
                      height: 15px;
                  }
              `
            : null}
`;

export const ChartLegend = ({ pieChartData, activeDataIndex }) => (
    <>
        <LegendHeader>
            <LegendHeaderNumber>
                {activeDataIndex != null ? pieChartData.aggregatedDefects[activeDataIndex].count : pieChartData.total}
            </LegendHeaderNumber>{' '}
            defects detected
        </LegendHeader>
        <DefectList>
            {pieChartData.aggregatedDefects.map((item, index) => (
                <DefectItem key={item.defect} inactive={activeDataIndex != null && activeDataIndex !== index}>
                    <ColorSwatch color={item.color} inactive={activeDataIndex != null && activeDataIndex !== index} />
                    {item.defect}
                </DefectItem>
            ))}
        </DefectList>
    </>
);

ChartLegend.propTypes = {
    pieChartData: propTypes.object,
    activeDataIndex: propTypes.number
};

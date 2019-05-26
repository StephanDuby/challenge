import React from 'react';
import propTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { defectShape } from '../../../routes/Statistics/Statistics';

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
    flex: 1 1 50%;
    width: 50%;
    min-width: 230px;
    height: 35px;
    line-height: 35px;
    cursor: pointer;

    ${props =>
        props.inactive
            ? css`
                  color: ${props.theme.lightTextColor};
              `
            : null}
`;

DefectItem.propTypes = {
    inactive: propTypes.bool
};

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

ColorSwatch.propTypes = {
    inactive: propTypes.bool
};

export const ChartLegend = ({ pieChartData, activeDataIndex, onClickItem }) => (
    <>
        <LegendHeader>
            <LegendHeaderNumber>
                {activeDataIndex != null ? pieChartData.aggregatedDefects[activeDataIndex].count : pieChartData.total}
            </LegendHeaderNumber>{' '}
            defects detected
        </LegendHeader>
        <DefectList>
            {pieChartData.aggregatedDefects.map((item, index) => (
                <DefectItem
                    key={item.defect}
                    inactive={activeDataIndex != null && activeDataIndex !== index}
                    onClick={onClickItem}
                    data-item={index}
                >
                    <ColorSwatch color={item.color} inactive={activeDataIndex != null && activeDataIndex !== index} />
                    {item.defect}
                </DefectItem>
            ))}
        </DefectList>
    </>
);

ChartLegend.propTypes = {
    pieChartData: propTypes.shape({
        aggregatedDefects: propTypes.arrayOf(propTypes.shape(defectShape))
    }),
    activeDataIndex: propTypes.number,
    onClickItem: propTypes.func
};

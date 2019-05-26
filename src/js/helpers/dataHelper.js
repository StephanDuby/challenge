import uuid from 'uuid';
import { theme } from '../theme/theme';

const getDistinctValues = (data, property) => {
    return [...new Set(data.map(x => x[property]))];
};

export const aggregateData = (data, property) => {
    const total = data.length;
    const possibleDefects = getDistinctValues(data, property);
    const aggregatedDefects = possibleDefects.map((defect, index) => {
        const count = data.filter(item => item[property] === defect).length;
        return {
            defect,
            count,
            color: theme.charts.colors[index],
            percentage: Math.round(((count * 100) / total) * 10) / 10
        };
    });

    return { total, aggregatedDefects };
};

export const prepareDataForTable = data => {
    const prepData = data.map(item => {
        item.uuid = uuid();
        return item;
    });
    return prepData;
};

export const sortDataByColumn = (data, column, sortDirection) => {
    const newData = data.sort((itemA, itemB) => {
        const val1 = itemA[column].toLowerCase();
        const val2 = itemB[column].toLowerCase();
        if (val1 > val2) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        if (val1 < val2) {
            return sortDirection === 'asc' ? -1 : 1;
        }
        return 0;
    });
    return newData;
};

export const getFilterValuesFromData = data => {
    const batchFilterValues = ['All batches'].concat(getDistinctValues(data, 'batch'));
    const dosageFilterValues = ['All dosages'].concat(getDistinctValues(data, 'dosage'));
    const stampFilterValues = ['All stamps'].concat(
        getDistinctValues(data, 'top-stamp').concat(getDistinctValues(data, 'bottom-stamp'))
    );
    const monthFilterValues = ['Current Month', 'Another month'];

    return {
        batchFilterValues,
        dosageFilterValues,
        stampFilterValues,
        monthFilterValues
    };
};

export const calulateSegmentPath = parameters => {
    const { radiusL, radiusS, startAngle, endAngle, positioningFactor } = parameters;
    const sinAlpha = Math.sin(startAngle);
    const cosAlpha = Math.cos(startAngle);
    const sinBeta = Math.sin(endAngle);
    const cosBeta = Math.cos(endAngle);

    const pointA = {
        x: positioningFactor + radiusL + radiusL * sinAlpha,
        y: positioningFactor + radiusL - radiusL * cosAlpha
    };
    const pointB = {
        x: positioningFactor + radiusL + radiusL * sinBeta,
        y: positioningFactor + radiusL - radiusL * cosBeta
    };
    const pointC = {
        x: positioningFactor + radiusL + radiusS * sinBeta,
        y: positioningFactor + radiusL - radiusS * cosBeta
    };
    const pointD = {
        x: positioningFactor + radiusL + radiusS * sinAlpha,
        y: positioningFactor + radiusL - radiusS * cosAlpha
    };

    const largeArc = endAngle - startAngle > Math.PI;

    const path = `M ${pointA.x} ${pointA.y} A ${radiusL} ${radiusL} 0 ${largeArc ? '1,1' : '0,1'} ${pointB.x} ${
        pointB.y
    } L ${pointC.x} ${pointC.y} A ${radiusS} ${radiusS} 0 ${largeArc ? '1,0' : '0,0'} ${pointD.x} ${pointD.y}  Z`;

    return path;
};

export const calculateStartChunkPath = parameters => {
    const { radiusL, radiusS, startAngle, barThickness, angleFactor, positioningFactor } = parameters;
    const chunkStartAngle = startAngle - angleFactor;
    const chunkEndAngle = startAngle;
    const chunkExtraEndAngle = startAngle + 0.1;
    const sinAlpha = Math.sin(chunkStartAngle);
    const cosAlpha = Math.cos(chunkStartAngle);
    const sinBeta = Math.sin(chunkEndAngle);
    const cosBeta = Math.cos(chunkEndAngle);
    const sinGamma = Math.sin(chunkExtraEndAngle);
    const cosGamma = Math.cos(chunkExtraEndAngle);
    const pointA = {
        x: positioningFactor + radiusL + radiusL * sinAlpha,
        y: positioningFactor + radiusL - radiusL * cosAlpha
    };
    const pointB = {
        x: positioningFactor + radiusL + radiusL * sinGamma,
        y: positioningFactor + radiusL - radiusL * cosGamma
    };
    const pointC = {
        x: positioningFactor + radiusL + radiusS * sinGamma,
        y: positioningFactor + radiusL - radiusS * cosGamma
    };
    const pointD = {
        x: positioningFactor + radiusL + radiusS * sinBeta,
        y: positioningFactor + radiusL - radiusS * cosBeta
    };

    const largeArc = chunkEndAngle - chunkStartAngle > Math.PI;

    const path = `M ${pointA.x} ${pointA.y} A ${radiusL} ${radiusL} 0 ${largeArc ? '1,1' : '0,1'} ${pointB.x} ${
        pointB.y
    } L ${pointC.x} ${pointC.y} A ${radiusS} ${radiusS} 0 ${largeArc ? '1,0' : '0,0'} ${pointD.x} ${
        pointD.y
    } A ${barThickness} ${barThickness} 0 ${largeArc ? '1,1' : '0,1'} ${pointA.x} ${pointA.y}`;
    return path;
};

export const calculateEndChunkPath = parameters => {
    const { radiusL, radiusS, endAngle, barThickness, angleFactor, positioningFactor } = parameters;
    const chunkStartAngle = endAngle + angleFactor;
    const chunkEndAngle = endAngle;
    const chunkExtraEndAngle = endAngle - 0.1;
    const sinAlpha = Math.sin(chunkStartAngle);
    const cosAlpha = Math.cos(chunkStartAngle);
    const sinBeta = Math.sin(chunkEndAngle);
    const cosBeta = Math.cos(chunkEndAngle);
    const sinGamma = Math.sin(chunkExtraEndAngle);
    const cosGamma = Math.cos(chunkExtraEndAngle);
    const pointA = {
        x: positioningFactor + radiusL + radiusL * sinAlpha,
        y: positioningFactor + radiusL - radiusL * cosAlpha
    };
    const pointB = {
        x: positioningFactor + radiusL + radiusL * sinGamma,
        y: positioningFactor + radiusL - radiusL * cosGamma
    };
    const pointC = {
        x: positioningFactor + radiusL + radiusS * sinGamma,
        y: positioningFactor + radiusL - radiusS * cosGamma
    };
    const pointD = {
        x: positioningFactor + radiusL + radiusS * sinBeta,
        y: positioningFactor + radiusL - radiusS * cosBeta
    };

    const largeArc = chunkEndAngle - chunkStartAngle > Math.PI;

    const path = `M ${pointA.x} ${pointA.y} A ${radiusL} ${radiusL} 0 ${largeArc ? '1,0' : '0,0'} ${pointB.x} ${
        pointB.y
    } L ${pointC.x} ${pointC.y} A ${radiusS} ${radiusS} 0 ${largeArc ? '1,0' : '0,0'} ${pointD.x} ${
        pointD.y
    } A ${barThickness} ${barThickness} 0 ${largeArc ? '1,1' : '0,0'} ${pointA.x} ${pointA.y}`;
    return path;
};

export const calculateActiveSegmentPath = parameters => {
    const { radiusL, radiusS, startAngle, endAngle, angleFactor, barThickness, positioningFactor } = parameters;
    const outerEndAngle = endAngle + angleFactor;
    const innerStartAngle = startAngle + angleFactor;
    const sinAlpha = Math.sin(startAngle);
    const cosAlpha = Math.cos(startAngle);
    const sinBeta = Math.sin(outerEndAngle);
    const cosBeta = Math.cos(outerEndAngle);
    const sinGamma = Math.sin(innerStartAngle);
    const cosGamma = Math.cos(innerStartAngle);
    const sinDelta = Math.sin(endAngle);
    const cosDelta = Math.cos(endAngle);

    const pointA = {
        x: positioningFactor + radiusL + radiusL * sinAlpha,
        y: positioningFactor + radiusL - radiusL * cosAlpha
    };
    const pointB = {
        x: positioningFactor + radiusL + radiusL * sinBeta,
        y: positioningFactor + radiusL - radiusL * cosBeta
    };
    const pointC = {
        x: positioningFactor + radiusL + radiusS * sinDelta,
        y: positioningFactor + radiusL - radiusS * cosDelta
    };
    const pointD = {
        x: positioningFactor + radiusL + radiusS * sinGamma,
        y: positioningFactor + radiusL - radiusS * cosGamma
    };

    const largeArc = endAngle - startAngle > Math.PI;

    const path = `M ${pointA.x} ${pointA.y} A ${radiusL} ${radiusL} 0 ${largeArc ? '1,1' : '0,1'} ${pointB.x} ${
        pointB.y
    } A ${barThickness} ${barThickness} 0 ${largeArc ? '1,1' : '0,1'} ${pointC.x} ${
        pointC.y
    } A ${radiusS} ${radiusS} 0 ${largeArc ? '1,0' : '0,0'} ${pointD.x} ${
        pointD.y
    } A ${barThickness} ${barThickness} 0 ${largeArc ? '1,1' : '0,1'} ${pointA.x} ${pointA.y}`;

    return path;
};

export const calculateButtonPositionOnActiveSegment = parameters => {
    const { radiusL, startAngle, endAngle, positioningFactor, angleFactor } = parameters;
    const actualStartAngle = startAngle + angleFactor;
    const positionAngle = actualStartAngle + (endAngle - actualStartAngle) / 2;
    const sinAlpha = Math.sin(positionAngle);
    const cosAlpha = Math.cos(positionAngle);
    const pointA = {
        x: positioningFactor + radiusL + radiusL * sinAlpha,
        y: positioningFactor + radiusL - radiusL * cosAlpha
    };
    return pointA;
};

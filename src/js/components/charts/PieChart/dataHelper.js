import { theme } from '../../../theme/theme';

export const aggregateData = (data, property) => {
    const total = data.length;
    const possibleDefects = getDistinctValues(data, property);
    const aggregatedDefects = possibleDefects.map((defect, index) => {
        return {
            defect,
            count: data.filter(item => item[property] === defect).length,
            color: theme.charts.colors[index]
        };
    });

    return { total, aggregatedDefects };
};

const getDistinctValues = (data, property) => {
    return [...new Set(data.map(x => x[property]))];
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

export const calculateEndChunkPath = parameters => {
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

export const calculateStartChunkPath = parameters => {
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
    const outerStartAngle = startAngle - angleFactor;
    const innerEndAngle = endAngle - angleFactor;
    const sinAlpha = Math.sin(outerStartAngle);
    const cosAlpha = Math.cos(outerStartAngle);
    const sinBeta = Math.sin(endAngle);
    const cosBeta = Math.cos(endAngle);
    const sinGamma = Math.sin(startAngle);
    const cosGamma = Math.cos(startAngle);
    const sinDelta = Math.sin(innerEndAngle);
    const cosDelta = Math.cos(innerEndAngle);

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
    const actualStartAngle = startAngle - angleFactor;
    const positionAngle = actualStartAngle + (endAngle - actualStartAngle) / 2;
    const sinAlpha = Math.sin(positionAngle);
    const cosAlpha = Math.cos(positionAngle);
    const pointA = {
        x: positioningFactor + radiusL + radiusL * sinAlpha,
        y: positioningFactor + radiusL - radiusL * cosAlpha
    };
    return pointA;
};

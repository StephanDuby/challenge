const addLight = (color, amount) => {
    console.log('color', color);
    const newColorCalc = parseInt(color, 16) + amount;

    console.log('newColorCalc', newColorCalc);
    const newColor = newColorCalc > 255 ? 255 : newColorCalc;
    const colorString = newColor.toString(16);
    const returnVal = colorString.length > 1 ? colorString : `0${colorString}`;
    return returnVal;
};

export const lightenColor = (color, amount = 150) => {
    const newColor = `#${addLight(color.substring(1, 3), amount)}${addLight(color.substring(3, 5), amount)}${addLight(
        color.substring(5, 7),
        amount
    )}`;

    console.log('color', color);
    console.log('newColor', newColor);
    return newColor;
};

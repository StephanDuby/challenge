const viewportSizes = {
    small: '320px',
    medium: '768px',
    large: '1280px'
};

export const device = {
    small: `(min-width: ${viewportSizes.small})`,
    medium: `(min-width: ${viewportSizes.medium})`,
    large: `(min-width: ${viewportSizes.large})`
};

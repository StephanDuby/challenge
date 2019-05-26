import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

export const Toggle = () => <div>this is toggle</div>;

Toggle.propTypes = {
    options: propTypes.arrayOf(
        propTypes.shape({
            icon: propTypes.string,
            value: propTypes.string
        })
    )
};

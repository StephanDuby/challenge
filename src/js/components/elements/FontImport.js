import React from 'react';
import { withTheme } from 'styled-components';
import propTypes from 'prop-types';

export const FontImport = withTheme(class FontImport extends React.Component {

    static propTypes = {
        theme: propTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        if (document.querySelector('style[id=fontimport]') === null) {
            const css = `@import url(${props.theme && props.theme.fontImport});`;
            const head = document.querySelector('head');
            const style = document.createElement('style');

            style.type = 'text/css';
            style.id = 'fontimport';
            style.appendChild(document.createTextNode(css));

            head.appendChild(style);
        }
    }

    render() {
        return null;
    }

});

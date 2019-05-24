import styled from 'styled-components';

export const LogoContainer = styled.div`
    width: 100%;
    height: 60px;
    line-height: 20px;
    text-align: center;
    background: ${props => props.theme && props.theme.brandPrimaryColor};
    padding: 20px 24px;
    margin-bottom: ${props => props.theme && props.theme.defaultMargin};
`;

export const Logo = styled.img`
    width: 100%;
    height: auto;
    display: inline-block;
`;

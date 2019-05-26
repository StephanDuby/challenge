import styled from 'styled-components';

export const PageContainer = styled.div`
    padding: ${props => props.theme.defaultPadding};
    position: relative;
    min-height: 100%;
    max-width: 1400px;
`;

export const PageHeader = styled.div`
    width: 100%;
    margin-bottom: ${props => props.theme.defaultMargin};
`;

export const PageBody = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
`;

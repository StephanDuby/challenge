import React from 'react';
import styled from 'styled-components';
import { PageContainer } from '../../components/PageLayout/PageLayout';

const StyledWarning = styled.div`
    width: 90%;
    margin: 0 auto;
    border: 2px solid red;
    color: red;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    padding: ${props => props.theme.defaultPadding};
`;

export class Tracker extends React.Component {

    render() {
        return (
            <PageContainer>
                <StyledWarning>
                    This Screen was not implemented as it was not part of the
                    challenge
                </StyledWarning>
            </PageContainer>
        );
    }

}

import styled from 'styled-components';
import { Logo, LogoContainer } from '../Logo/Logo';
import { Hamburger } from '../Hamburger/Hamburger';
import { device } from '../../../helpers/viewportSizes';

export const MOBILE_HEADER_HEIGHT = '40px';

export const MobileHeader = styled.div`
    height: ${MOBILE_HEADER_HEIGHT};
    width: 100%;
    background: ${props => props.theme.brandPrimaryColor};
    position: relative;
    z-index: 1000;

    @media ${device.medium} {
        display: none;
    }
`;

export const MobileHamburger = styled(Hamburger)`
    position: absolute;
    top: 13px;
    left: 10px;
`;

export const MobileLogoContainer = styled(LogoContainer)`
    width: 50px;
    height: ${MOBILE_HEADER_HEIGHT};
    line-height: ${MOBILE_HEADER_HEIGHT};
    margin: 0 auto;
    text-align: center;
    padding: 0;
`;

export const MobileLogo = styled(Logo)`
    width: 40px;
    margin: 0 auto;
`;

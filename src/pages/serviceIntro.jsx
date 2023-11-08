import React from 'react';
import ServiceIntroPage1 from '../components/serviceInfo/bodyAnsContent';
import ServiceIntroPage2 from '../components/serviceInfo/RecommendContent';
import ServiceIntroPage3 from '../components/serviceInfo/ClinicContent';
import ServiceIntroPage4 from '../components/serviceInfo/ConnectCenter';

function ServiceIntro() {


    return (
        <div>
            <ServiceIntroPage1 />
            <ServiceIntroPage2 />
            <ServiceIntroPage3 />
            <ServiceIntroPage4 />
        </div>
    );
}

export default ServiceIntro;

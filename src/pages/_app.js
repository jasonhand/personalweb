import '../css/main.css';
import { useEffect } from 'react';
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '845079cb-4226-4831-a71e-8873c022a143',
    clientToken: 'puba67520ccd7c8bd2403f3ff782862386a',
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'datadoghq.com',
    service: 'jasonhand.com',
    env: 'production',
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input'
});

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

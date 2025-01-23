import '../css/main.css';
import { useEffect } from 'react';
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '845079cb-4226-4831-a71e-8873c022a143',
    clientToken: 'puba67520ccd7c8bd2403f3ff782862386a',
    site: 'datadoghq.com',
    service: 'jasonhand.com',
    env: 'production',
    version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input'
});

datadogRum.getUser();

//datadogRum.setUser({
//    id: '1234',
//    name: 'John Doe',
//    email: 'john@doe.com',
//    plan: 'premium'
//});

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

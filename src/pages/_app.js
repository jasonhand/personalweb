import '../css/main.css';

import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <script
    src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js"
    type="text/javascript">
</script>
<script>
    window.DD_RUM && window.DD_RUM.init({
      clientToken: 'puba67520ccd7c8bd2403f3ff782862386a',
      applicationId: '845079cb-4226-4831-a71e-8873c022a143',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.com',
      service: 'jasonhand.com',
      env: 'prod',
      // Specify a version number to identify the deployed version of your application in Datadog
      // version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask-user-input',
    });
</script>
        {children}
      </body>
    </html>
  );
}

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}



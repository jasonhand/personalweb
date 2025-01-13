import '../css/main.css';
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script 
          src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js" 
          strategy="beforeInteractive"
        />
        <Script id="datadog-init" strategy="afterInteractive">
          {`
            window.DD_RUM && window.DD_RUM.init({
              clientToken: 'puba67520ccd7c8bd2403f3ff782862386a',
              applicationId: '845079cb-4226-4831-a71e-8873c022a143',
              site: 'datadoghq.com',
              service: 'jasonhand.com',
              env: 'prod',
              sessionSampleRate: 100,
              sessionReplaySampleRate: 100,
              trackUserInteractions: true,
              trackResources: true,
              trackLongTasks: true,
              defaultPrivacyLevel: 'mask-user-input',
            });
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

export function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

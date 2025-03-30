import * as React from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

// Import PanoramaViewer component
const PanoramaViewer = dynamic(() => import('../../panorama/PanoramaViewer'), {
    ssr: true
});

export default function PanoramaSection(props) {
    const { elementId, colors = 'colors-a', styles = {} } = props;

    return (
        <div
            id={elementId}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-panorama-section',
                'w-full h-screen',
                colors
            )}
        >
            <PanoramaViewer />
        </div>
    );
} 
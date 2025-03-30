import { Model } from '@stackbit/types';

export const PanoramaSectionModel: Model = {
    type: 'object',
    name: 'PanoramaSection',
    label: 'VR Panorama',
    labelField: 'title',
    fieldGroups: [
        {
            name: 'styles',
            label: 'Styles',
            icon: 'palette'
        }
    ],
    fields: [
        {
            type: 'string',
            name: 'elementId',
            label: 'ID',
            description: 'The unique ID for this section',
            group: 'styles'
        },
        {
            type: 'enum',
            name: 'colors',
            label: 'Colors',
            description: 'The color theme of the section',
            options: [
                { label: 'Colors A', value: 'colors-a' },
                { label: 'Colors B', value: 'colors-b' },
                { label: 'Colors C', value: 'colors-c' },
                { label: 'Colors D', value: 'colors-d' },
                { label: 'Colors E', value: 'colors-e' },
                { label: 'Colors F', value: 'colors-f' }
            ],
            default: 'colors-a',
            group: 'styles'
        },
        {
            type: 'model',
            name: 'styles',
            label: 'Styles',
            models: ['SectionStyles'],
            default: {
                self: {
                    height: 'auto',
                    width: 'wide',
                    padding: ['pt-12', 'pb-12', 'pl-4', 'pr-4'],
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            },
            group: 'styles'
        }
    ]
}; 
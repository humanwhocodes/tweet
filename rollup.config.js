export default [
    {
        input: 'src/bin.js',
        external: [
            'fs',
            'path'
        ],
        output: [
            {
                file: 'dist/bin.cjs.js',
                format: 'cjs',
                banner: '#!/usr/bin/env node\n'
            },
            {
                file: 'dist/bin.js',
                format: 'esm',
                banner: '#!/usr/bin/env node\n'
            }
        ]
    }
];

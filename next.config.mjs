/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin'
import path from "node:path";
import {fileURLToPath} from "node:url";

const withNextIntl = createNextIntlPlugin()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['appleid.apple.com'],
        },
    },
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/main',
            },
        ]
    },
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: {not: [...fileLoaderRule.resourceQuery.not, /url/]}, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i

        return config
    }

};


export default withNextIntl(nextConfig);

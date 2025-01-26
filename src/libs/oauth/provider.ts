import {Apple, GitHub, Google} from "arctic";
import "server-only"
export const github = new GitHub(process.env.AUTH_GITHUB_ID!, process.env.AUTH_GITHUB_SECRET!)
export const google = new Google(process.env.AUTH_GOOGLE_ID!, process.env.AUTH_GOOGLE_SECRET!, process.env.AUTH_GOOGLE_REDIRECTURL!)
export const apple = new Apple({
    clientId: process.env.AUTH_APPLE_WEB_CLIENT_ID!,
    teamId: process.env.AUTH_APPLE_TEAM_ID!,
    keyId: process.env.AUTH_APPLE_KEY_ID!,
    certificate: process.env.AUTH_APPLE_CERTIFICATE!,
}, process.env.AUTH_APPLE_REDIRECTURAL!)

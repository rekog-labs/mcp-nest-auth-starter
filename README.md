# MCP Nest Auth Starter

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/G6BLGK?referralCode=XAdIhJ)

A starter template for building MCP Servers that implement the MCP Authorization flow.

## Getting Started

The fastest way to get started is to deploy the project on by clicking the button below to deploy:

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/G6BLGK?referralCode=XAdIhJ)

For the deployment you need the following:

1. Create a [New GitHub App](https://github.com/settings/applications/new), required for user authentication
    * For the "Authorization callback URL" add the placeholder `http://localhost:3000/auth/callback` and create the app, you will update it at step 5.
3. Add the GitHub Client ID and Client Secret in the Deploy panel on Railway, and click "Deploy"
4. After the app is deployed, the Custom Domain is available in the railway deployment settings page.
5. Update the "Authorization callback URL" of the GitHub app to the custom domain with the postfix as shown here: `https://<custom-domain>.up.railway.app/auth/callback`.

**And you are ready to roll!**

Open MCP Inspector at `https://<custom-domain>.up.railway.app/mcp` to see the available resources and tools.

### Local Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/rekog-labs/mcp-nest-auth-starter.git
cd mcp-nest-auth-starter
npm install
```

Set the environment variables in a `.env` file at the root of the project. You can use the provided `.env.example` as a template.

```
SERVER_URL=http://localhost:3000
GITHUB_CLIENT_ID=<your_github_client_id>
GITHUB_CLIENT_SECRET=<your_github_client_secret>
JWT_SECRET=<your_jwt_secret>
```

### Environment Variables

- `SERVER_URL` - The base URL of your application.
- `GITHUB_CLIENT_ID` - Your GitHub OAuth client ID.
- `GITHUB_CLIENT_SECRET` - Your GitHub OAuth client secret.
- `JWT_SECRET` - Your JSON Web Token secret.

### Running the App

#### Development
```bash
npm run start:dev
```

#### Production
```bash
npm run build
npm run start:prod
```

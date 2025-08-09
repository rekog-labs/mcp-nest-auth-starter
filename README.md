# MCP NestJS Auth Starter

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/G6BLGK?referralCode=XAdIhJ)

A robust starter template for building scalable, production-ready APIs using [NestJS](https://nestjs.com/) and the [Model Context Protocol (MCP)](https://github.com/rekog-labs/model-context-protocol). This project provides a solid foundation for rapid development of secure, context-aware applications, featuring:

- **NestJS**: Progressive Node.js framework for building efficient server-side applications.
- **MCP Integration**: Out-of-the-box support for Model Context Protocol resources and tools.
- **Authentication**: Easily extendable authentication layer for secure APIs.

## Getting Started

The fastest way to get started is to deploy the project on by clicking the button below to deploy:

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/G6BLGK?referralCode=XAdIhJ)

For the deployment you need the following:

1. Create a [New GitHub App](https://github.com/settings/applications/new) used for user authentication
2. For the "Authorization callback URL" add the placeholder `http://localhost:3000/auth/callback` and create the app.
3. Add the details in the Deploy panel on Railway, and click "Deploy"
4. After the app is deployed, the Custom Domain is available in the railway deployment settings page.
5. Update the "Authorization callback URL" of the GitHub app to the custom domain with the prefix as shown here: `https://<custom-domain>.up.railway.app/auth/callback`.

After that you are ready to roll! Open MCP Inspector at `https://<custom-domain>.up.railway.app/mcp` to see the available resources and tools.

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

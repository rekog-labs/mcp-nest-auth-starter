import { Module } from '@nestjs/common';
import { GitHubOAuthProvider, McpAuthModule, McpModule } from '@rekog/mcp-nest';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GreetingPrompt } from './resources/greeting.prompt';
import { GreetingResource } from './resources/greeting.resource';
import { GreetingTool } from './resources/greeting.tool';
import { McpAuthJwtGuard } from '@rekog/mcp-nest/dist/authz/guards/jwt-auth.guard';
import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    McpAuthModule.forRoot({
      provider: GitHubOAuthProvider,
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      jwtSecret: process.env.JWT_SECRET!,
      serverUrl: process.env.SERVER_URL,
      resource: process.env.SERVER_URL + '/mcp',
      cookieSecure: process.env.NODE_ENV === 'production',
      apiPrefix: 'auth',
      // endpoints: {
      //   wellKnown: '/.well-known/oauth-authorization-server',
      //   callback: '/remote-auth/auth/callback',
      // },
      // Storage Configuration - choose one of the following options:

      // Option 1: Use in-memory store (default if not specified)
      // storeConfiguration: { type: 'memory' }
      // OR just omit storeConfiguration entirely for memory store

      // Option 2: Use TypeORM for persistent storage
      // storeConfiguration: {
      //   type: 'typeorm',
      //   options: {
      //     type: 'sqlite',
      //     database: './oauth.db',
      //     synchronize: true,
      //     logging: false,
      //   },
      // },

      // Option 3: Use Drizzle for persistent storage
      // storeConfiguration: {
      //   type: 'custom',
      //   store: new SQLiteStore('./sqlite-store.db'),
      // },
    }),

    McpModule.forRoot({
      name: 'my-mcp-server',
      version: '1.0.0',
      streamableHttp: {
        enableJsonResponse: false,
        sessionIdGenerator: () => randomUUID(),
        statelessMode: false,
      },
      guards: [McpAuthJwtGuard],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GreetingPrompt, GreetingResource, GreetingTool],

})
export class AppModule {}

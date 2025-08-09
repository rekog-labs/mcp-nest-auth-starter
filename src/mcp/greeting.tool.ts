import { Injectable } from '@nestjs/common';
import { Context, Tool } from '@rekog/mcp-nest';
import type { McpRequestWithUser, McpUserPayload } from '@rekog/mcp-nest';

@Injectable()
export class GreetingTool {
  constructor() {}

  @Tool({
    name: 'greet-logged-in-user',
    description:
      'Greets the currently logged-in user using their name from the request',
    annotations: {
      title: 'Greet Logged-in User Tool',
      destructiveHint: false,
      readOnlyHint: true,
      idempotentHint: true,
      openWorldHint: false,
    },
  })
  greetLoggedInUser(
    args: unknown,
    context: Context,
    request: McpRequestWithUser,
  ) {
    // We know user exists when authentication is enabled
    const user = request.user;
    const name: string | undefined =
      user.displayName || user.username || user.name;

    if (!name) {
      return {
        content: [
          {
            type: 'text',
            text: 'Error: No name found for the logged-in user.',
          },
        ],
      };
    }

    return `Hello, ${name}!`;
  }
}

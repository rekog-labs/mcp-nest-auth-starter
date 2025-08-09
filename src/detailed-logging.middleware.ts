import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DetailedLoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const requestId = Math.random().toString(36).substring(7);

    // Log incoming request details
    console.log('\n' + '='.repeat(80));
    console.log('\n' + '='.repeat(80));
    console.log('\n' + '='.repeat(80));
    console.log(
      `🔵 INCOMING REQUEST [${requestId}] - ${new Date().toISOString()}`,
    );
    console.log('='.repeat(80));
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`Path: ${req.path}`);
    console.log(`Base URL: ${req.baseUrl}`);
    console.log(`Original URL: ${req.originalUrl}`);
    console.log(`Protocol: ${req.protocol}`);
    console.log(`Host: ${req.get('host')}`);
    console.log(`IP: ${req.ip}`);
    console.log(`User Agent: ${req.get('user-agent')}`);

    // Log query parameters
    console.log('\n📋 QUERY PARAMETERS:');
    console.log(JSON.stringify(req.query, null, 2));

    // Log route parameters
    console.log('\n🎯 ROUTE PARAMETERS:');
    console.log(JSON.stringify(req.params, null, 2));

    // Log all headers (including sensitive ones)
    console.log('\n📤 REQUEST HEADERS:');
    Object.entries(req.headers).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });

    // Log cookies
    console.log('\n🍪 COOKIES:');
    console.log(JSON.stringify(req.cookies, null, 2));

    // Log request body
    console.log('\n📦 REQUEST BODY:');
    if (req.body) {
      console.log(JSON.stringify(req.body, null, 2));
    } else {
      console.log('No body');
    }

    // Log raw body if available
    if ((req as any).rawBody) {
      console.log('\n📦 RAW REQUEST BODY:');
      console.log((req as any).rawBody.toString());
    }

    // Store original res.json and res.send to intercept responses
    const originalJson = res.json;
    const originalSend = res.send;
    const originalEnd = res.end;

    let responseBody: any = null;

    // Intercept res.json
    res.json = function (body: any) {
      responseBody = body;
      return originalJson.call(this, body);
    };

    // Intercept res.send
    res.send = function (body: any) {
      responseBody = body;
      return originalSend.call(this, body);
    };

    // Intercept res.end
    res.end = function (chunk?: any, encoding?: any) {
      if (chunk && !responseBody) {
        responseBody = chunk;
      }
      return originalEnd.call(this, chunk, encoding);
    };

    // Log response when finished
    res.on('finish', () => {
      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log('\n' + '='.repeat(80));
      console.log(
        `🟢 OUTGOING RESPONSE [${requestId}] - ${new Date().toISOString()}`,
      );
      console.log('='.repeat(80));
      console.log(`Status Code: ${res.statusCode}`);
      console.log(`Status Message: ${res.statusMessage}`);
      console.log(`Duration: ${duration}ms`);

      // Log response headers
      console.log('\n📥 RESPONSE HEADERS:');
      const responseHeaders = res.getHeaders();
      Object.entries(responseHeaders).forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
      });

      // Log response body
      console.log('\n📦 RESPONSE BODY:');
      if (responseBody) {
        try {
          if (typeof responseBody === 'string') {
            // Try to parse as JSON first
            try {
              const parsed = JSON.parse(responseBody);
              console.log(JSON.stringify(parsed, null, 2));
            } catch {
              console.log(responseBody);
            }
          } else {
            console.log(JSON.stringify(responseBody, null, 2));
          }
        } catch (error) {
          console.log('Failed to serialize response body:', error);
          console.log('Raw response body:', responseBody);
        }
      } else {
        console.log('No response body');
      }

      console.log('\n' + '='.repeat(80));
      console.log(`✅ REQUEST COMPLETED [${requestId}] in ${duration}ms`);
      console.log('='.repeat(80) + '\n');
    });

    // Log errors
    res.on('error', (error) => {
      console.log('\n' + '❌'.repeat(40));
      console.log(
        `🔴 RESPONSE ERROR [${requestId}] - ${new Date().toISOString()}`,
      );
      console.log('❌'.repeat(40));
      console.error('Response error:', error);
      console.log('❌'.repeat(40) + '\n');
    });

    next();
  }
}

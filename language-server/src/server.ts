import log from './log';
import { methodLookup } from './method-lookup';
import { LINE_BREAK, MessageId, MessageResult } from './types';

function respond(id: MessageId, result: MessageResult | null) {
  const message = JSON.stringify({ id, result });
  const messageLength = Buffer.byteLength(message, 'utf-8');
  const header = `Content-Length: ${messageLength}${LINE_BREAK}`;

  // log.write(header + message);
  process.stdout.write(header + message);
}

function processMessage(message: any) {
  const method = methodLookup[message.method];
  if (method) {
    const result = method(message);
    if (result !== undefined) {
      respond(message.id, result);
    }
  }
}

let buffer = '';
process.stdin.on('data', chunk => {
  buffer += chunk;

  while (true) {
    // check the content-length line
    const lengthMatch = buffer.match(/Content-Length: (\d+)\r\n/);
    if (!lengthMatch) break;

    const contentLength = parseInt(lengthMatch[1], 10);
    const messageStartIndex = buffer.indexOf(LINE_BREAK) + LINE_BREAK.length;

    // if doesn't have the full mesasge
    if (buffer.length < messageStartIndex + contentLength) break;

    const rawMessage = buffer.slice(messageStartIndex, messageStartIndex + contentLength);
    const message = JSON.parse(rawMessage);

    log.write({ id: message.id, method: message.method, params: message.params });

    processMessage(message);

    // remove the processed message from the buffer (sliding)
    buffer = buffer.slice(messageStartIndex + contentLength);
  }
});


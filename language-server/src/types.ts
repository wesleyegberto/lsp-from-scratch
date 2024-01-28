export const LINE_BREAK = '\r\n\r\n';

export interface Message {
  jsonrpc: string;
}

/**
 * Notify an event that doesn't need result.
 */
export interface NotificationMessage extends Message {
  method: string;
  params?: unknown[] | object;
}

export type MessageId = number | string;

/**
 * IDE request to perform some action and needs a result.
 */
export interface RequestMessage extends Message {
  id: MessageId;
  method: string;
  params?: unknown[] | object;
}

export type MessageResult = string | number | boolean | unknown[] | object | null;

export interface ResponseMessage extends Message {
  id: MessageId | null;
  result?: MessageResult;
  error?: ResponseError;
}

export interface ResponseError {
  code: number;
  message: string;
}

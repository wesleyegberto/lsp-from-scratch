import { MessageResult, NotificationMessage, RequestMessage } from './types';

import { initialize } from './methods/initialize';
import { textDocumentCompletion } from './methods/textDocument/completion';
import { didChange } from './methods/textDocument/didChange';

type RequestMethod = (message: RequestMessage) => MessageResult;
type NotificationMethod = (message: NotificationMessage) => void;

export const methodLookup: Record<string, RequestMethod | NotificationMethod> = {
  initialize,
  'textDocument/completion': textDocumentCompletion,
  'textDocument/didChange': didChange
};


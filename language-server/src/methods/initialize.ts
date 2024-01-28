import { RequestMessage } from "../types";

type ServerCapabilities = Record<string, unknown>;

interface InitializeResult {
  capabilities: ServerCapabilities;
  serverInfo?: {
    name: string;
    version?: string;
  }
}

export function initialize(request: RequestMessage): InitializeResult {
  return {
    capabilities: {
      completionProvider: {},
      textDocumentSync: 1
    },
    serverInfo: {
      name: 'lsp-from-scratch',
      version: '0.0.1'
    }
  };
}

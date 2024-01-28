export type DocumentUri = string;
export type DocumentBody = string;

export interface TextDocumentIdentifier {
  uri: DocumentUri;
}

export interface VersionedTextDocumentIdentifier extends TextDocumentIdentifier {
  version: number;
}

export interface TextDocumentPosition {
  line: number;
  character: number;
}

export const documents = new Map<DocumentUri, DocumentBody>;

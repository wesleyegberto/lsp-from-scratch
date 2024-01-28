import { NotificationMessage } from "../../types";
import { VersionedTextDocumentIdentifier, documents } from "../../documents";

interface TextDocumentContentChangeEvent {
  text: string;
}

interface DidChangeTextDocumentParams {
  textDocument: VersionedTextDocumentIdentifier;
  contentChanges: TextDocumentContentChangeEvent[];
}

export function didChange(message: NotificationMessage): void {
  const params = message.params as DidChangeTextDocumentParams;

  documents.set(params.textDocument.uri, params.contentChanges[0].text);
}

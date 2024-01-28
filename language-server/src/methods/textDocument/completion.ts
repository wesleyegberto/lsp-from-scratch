import * as fs from 'fs';

import { RequestMessage } from '../../types';
import { TextDocumentIdentifier, TextDocumentPosition, documents } from '../../documents';

const words = fs.readFileSync('/usr/share/dict/words').toString().split('\n');
const items: CompletionItem[] = words.map(w => ({ label: w }));

function getItemsFor(text: string): CompletionItem[] {
  return items.filter(i => i.label.startsWith(text)).slice(0, 1000);
}

export interface CompletionItem {
  label: string;
}

export interface CompletionList {
  isIncomplete: boolean;
  items: CompletionItem[];
}

export interface TextDocumentPositionParams {
  textDocument: TextDocumentIdentifier,
  position: TextDocumentPosition;
}

export interface CompletionParams extends TextDocumentPositionParams {
  context: unknown;
}

export function textDocumentCompletion (message: RequestMessage): CompletionList | null {
  const params = message.params as CompletionParams;
  const content = documents.get(params.textDocument.uri);
  if (!content) {
    return null;
  }

  const currentLine = content.split('\n')[params.position.line];
  const lineUntilCursor = currentLine.slice(0, params.position.character);
  const currentPrefix = lineUntilCursor.replace(/.*\W(.*?)/, '$1');

  return {
    isIncomplete: true,
    items: getItemsFor(currentPrefix)
  };
};

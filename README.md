# LSP from Scratch

Simple LSP to help write text by providing autocomplete using the computer dictionary.

## LSP

LSP uses JSON-RPC in the communication between the text editor and language server.

The logs are written to `/tmp/lsp.log`.

## Activating the LSP

### VS Code

VS Code extension's `package.json` should have an attribute `activationEvents`:

```json
"activationEvents": [
  "onLanguage:plaintext"
]
```

And change the `documentSelector` in `client/src/extension.ts` to replace the `*` (e.g.)

```
documentSelector: [{ scheme: "file", language: "plaintext" }],
```

### Neovim

In Neovim, we just need to call `vim.lsp.start()` to setup the LSP client pointing to the
LSP directory (just clone to some folder, usually `~/.cache/lsp-from-scratch`).

This client just startup `npx` to compile and run the LSP project, but we could also use
a compiled JS, a binary or just a shell script.

## Structure

```
.
├── language-server/: LSP source code
├── neovim-client/: how to setup the LSP client in Neovim
├── vscode-client/: VS Code extension to use LSP
```

## Links

- [LSP Specification](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/)
- [LSP Template Project](https://github.com/semanticart/lsp-from-scratch)
- [LSP Intro + Language Servers Aren't Just For Languages](https://www.youtube.com/watch?v=p0Vlz66AFNw)
- [LSP: Building a Language Server From Scratch](https://www.youtube.com/watch?v=Xo5VXTRoL6Q)


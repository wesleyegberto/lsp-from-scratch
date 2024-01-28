vim.lsp.start({
  name = 'LSP From Scratch',
  cmd = {
    -- invokes npx to compile and run the LSP project
    'npx', 'ts-node',
    vim.fn.expand('~/.cache/lsp-from-scratch/server/src/server.ts')
  },
  capabilities = vim.lsp.protocol.make_client_capabilities()
})

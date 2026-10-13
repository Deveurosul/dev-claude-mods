import type { McpServer } from '../../types'

// One row per MCP server the context carries, from its tools' schemas, in the
// order the servers first appear.
export const groupMcpTools = (tools: readonly { serverName: string; tokens: number }[]): McpServer[] => {
  const servers = new Map<string, McpServer>()
  for (const tool of tools) {
    const server = servers.get(tool.serverName) ?? { name: tool.serverName, tools: 0, tokens: 0 }
    servers.set(tool.serverName, { ...server, tools: server.tools + 1, tokens: server.tokens + tool.tokens })
  }
  return [...servers.values()]
}

// The corner's label: how many servers are loaded, `MCP …` until it is known.
export const mcpLabel = (servers: readonly McpServer[] | null): string => `MCP ${servers === null ? '…' : servers.length}`

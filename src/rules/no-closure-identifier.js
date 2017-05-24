export const meta = {
  docs: {
      description: "disallow script closure identifier",
      category: "Possible Errors",
      recommended: true
  },
  fixable: "code",
  schema: [] // no options
}

export const create = ( context ) => ({
  "Program > ReturnStatement > FunctionExpression > Identifier.id": ( node ) => {
    context.report({
      message: "Script closure must not be named",
      node: node,
      data: {
        identifier: node.name
      },
      fix: ( fixer ) => fixer.remove( node )
    })
  }
})

export default {
  meta,
  create
}

export const meta = {
  docs: {
      description: "disallow code outside of the script closure",
      category: "Possible Errors",
      recommended: true
  },
  schema: [] // no options
}

export const create = ( context ) => ({
  "Program > ReturnStatement ~ *": ( node ) => {
    context.report({
      message: "All code must be contained in the script closure",
      node: node
    })
  }
})

export default {
  meta,
  create
}

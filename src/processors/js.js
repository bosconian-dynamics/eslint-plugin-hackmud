import { SUBSCRIPT_PREFIX, DATABASE_PREFIX, DEBUG_GLOBAL } from '../config.js'

function pre( text, filename ) {
  // TODO: handle multiple top-level anonymous closures
  text = text
    .replace( /#s\./g, SUBSCRIPT_PREFIX )
    .replace( /#db./g, DATABASE_PREFIX )
    .replace( /#D/g, DEBUG_GLOBAL )

  return [`return ${text}`]
}

function post( messages, filename ) {
  messages = messages[0]
    .map( message => {
      if( message.line == 1 )
        message.column -= 7

      message.source = message.source
        .replace( SUBSCRIPT_PREFIX, '#s.' )
        .replace( DATABASE_PREFIX, '#db.' )
        .replace( DEBUG_GLOBAL, '#D' )

      message.message = message.message
        .replace( SUBSCRIPT_PREFIX, '#s.' )
        .replace( DATABASE_PREFIX, '#db.' )
        .replace( DEBUG_GLOBAL, '#D' )

      return message
    })
    .filter( ( msg, i, msgs ) => {
      if( msg.ruleId == 'no-unreachable' && msgs.some( m => m.ruleId == 'hackmud2/no-closure-siblings' && m.line == msg.line ) )
        return false

      if( msg.ruleId == 'no-undef' && msgs.some( m => m.ruleId == 'hackmud2/validate-subscript-syntax' && m.line == msg.line ) )
        return false

      return true
    })
    .sort( ( a, b ) => a.severity == b.severity ? 0 : a.severity > b.severity ? -1 : 1 )

  return messages
}

export default {
  preprocess: pre,
  postprocess: post
}

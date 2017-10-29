import {
  SUBSCRIPT_PREFIX,
  DATABASE_PREFIX,
  PREPROC_G,
  PREPROC_D,
  PREPROC_FMCL
} from '../config.js'

function pre( text, filename ) {
  // TODO: handle multiple top-level anonymous closures
  text = text
    .replace( /#(\w)?s\./g, '$$1S_' )
    .replace( /#db\./g, DATABASE_PREFIX )
    .replace( /#D/g, PREPROC_D )
    .replace( /#G/g, PREPROC_G )
    .replace( /#FMCL/g, PREPROC_FMCL )

  return [`return ${text}`]
}

function post( messages, filename ) {
  messages = messages[0]
    .map( message => {
      if( message.line == 1 )
        message.column -= 7

      message.source = message.source
        .replace( /$(\w?S_)/g, '#s.' )
        .replace( DATABASE_PREFIX, '#db.' )
        .replace( PREPROC_D, '#D' )
        .replace( PREPROC_G, '#G' )
        .replace( PREPROC_FMCL, '#FMCL' )

      message.message = message.message
        .replace( /$(\w?S_)/g, '#s.' )
        .replace( DATABASE_PREFIX, '#db.' )
        .replace( PREPROC_D, '#D' )
        .replace( PREPROC_G, '#G' )
        .replace( PREPROC_FMCL, '#FMCL' )

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

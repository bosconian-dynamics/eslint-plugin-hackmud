/**
 * @fileoverview Linting rules for hackmud player-scripts
 * @author Adam Bosco
 */
// TODO: take a look at using no-restricted-syntax

import rules from './rules'
import configs from './configs'
import processors from './processors'
import environment from './environment.json'

export default {
  rules,
  processors,
  configs,
  environments: {
    hackmud2: environment
  },
}

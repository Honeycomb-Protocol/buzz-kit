/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import { IndexedReference, indexedReferenceBeet } from './IndexedReference'
import { GuildVisibility, guildVisibilityBeet } from './GuildVisibility'
import { JoiningCriteria, joiningCriteriaBeet } from './JoiningCriteria'
export type CreateGuildArgs = {
  name: string
  matrixId: string
  chiefRefrence: IndexedReference
  visibility: GuildVisibility
  joiningCriteria: JoiningCriteria
}

/**
 * @category userTypes
 * @category generated
 */
export const createGuildArgsBeet =
  new beet.FixableBeetArgsStruct<CreateGuildArgs>(
    [
      ['name', beet.utf8String],
      ['matrixId', beet.utf8String],
      ['chiefRefrence', indexedReferenceBeet],
      ['visibility', guildVisibilityBeet],
      ['joiningCriteria', joiningCriteriaBeet],
    ],
    'CreateGuildArgs'
  )

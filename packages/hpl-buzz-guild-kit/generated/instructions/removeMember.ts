/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as splToken from '@solana/spl-token'
import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import { RemoveArgs, removeArgsBeet } from '../types/RemoveArgs'

/**
 * @category Instructions
 * @category RemoveMember
 * @category generated
 */
export type RemoveMemberInstructionArgs = {
  args: RemoveArgs
}
/**
 * @category Instructions
 * @category RemoveMember
 * @category generated
 */
export const removeMemberStruct = new beet.BeetArgsStruct<
  RemoveMemberInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', removeArgsBeet],
  ],
  'RemoveMemberInstructionArgs'
)
/**
 * Accounts required by the _removeMember_ instruction
 *
 * @property [] guildKit
 * @property [_writable_] guild
 * @property [] project
 * @property [] chiefAddressContainer
 * @property [_writable_] chiefAccount
 * @property [_writable_] member
 * @property [_writable_] membershipLock
 * @property [_writable_, **signer**] payer
 * @property [_writable_, **signer**] authority
 * @property [_writable_] vault
 * @category Instructions
 * @category RemoveMember
 * @category generated
 */
export type RemoveMemberInstructionAccounts = {
  guildKit: web3.PublicKey
  guild: web3.PublicKey
  project: web3.PublicKey
  chiefAddressContainer: web3.PublicKey
  chiefAccount: web3.PublicKey
  member: web3.PublicKey
  membershipLock: web3.PublicKey
  payer: web3.PublicKey
  authority: web3.PublicKey
  rent?: web3.PublicKey
  vault: web3.PublicKey
  tokenProgram?: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const removeMemberInstructionDiscriminator = [
  171, 57, 231, 150, 167, 128, 18, 55,
]

/**
 * Creates a _RemoveMember_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category RemoveMember
 * @category generated
 */
export function createRemoveMemberInstruction(
  accounts: RemoveMemberInstructionAccounts,
  args: RemoveMemberInstructionArgs,
  programId = new web3.PublicKey('38foo9CSfPiPZTBvNhouNaYpvkzKEzWW396PUW2GKPVA')
) {
  const [data] = removeMemberStruct.serialize({
    instructionDiscriminator: removeMemberInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.guildKit,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.guild,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.project,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.chiefAddressContainer,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.chiefAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.member,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.membershipLock,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.payer,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.authority,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.rent ?? web3.SYSVAR_RENT_PUBKEY,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.vault,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenProgram ?? splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
  ]

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc)
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  })
  return ix
}

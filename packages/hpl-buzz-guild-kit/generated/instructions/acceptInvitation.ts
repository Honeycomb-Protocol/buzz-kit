/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as splToken from '@solana/spl-token'
import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import {
  AcceptInvitationArgs,
  acceptInvitationArgsBeet,
} from '../types/AcceptInvitationArgs'

/**
 * @category Instructions
 * @category AcceptInvitation
 * @category generated
 */
export type AcceptInvitationInstructionArgs = {
  args: AcceptInvitationArgs
}
/**
 * @category Instructions
 * @category AcceptInvitation
 * @category generated
 */
export const acceptInvitationStruct = new beet.BeetArgsStruct<
  AcceptInvitationInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', acceptInvitationArgsBeet],
  ],
  'AcceptInvitationInstructionArgs'
)
/**
 * Accounts required by the _acceptInvitation_ instruction
 *
 * @property [] guildKit
 * @property [_writable_] guild
 * @property [_writable_] invitation
 * @property [_writable_] chief
 * @property [] memberAddressContainer
 * @property [_writable_] memberAccount
 * @property [_writable_] membershipLock
 * @property [_writable_, **signer**] payer
 * @property [_writable_, **signer**] authority
 * @property [_writable_] vault
 * @category Instructions
 * @category AcceptInvitation
 * @category generated
 */
export type AcceptInvitationInstructionAccounts = {
  guildKit: web3.PublicKey
  guild: web3.PublicKey
  invitation: web3.PublicKey
  chief: web3.PublicKey
  memberAddressContainer: web3.PublicKey
  memberAccount: web3.PublicKey
  membershipLock: web3.PublicKey
  tokenProgram?: web3.PublicKey
  payer: web3.PublicKey
  authority: web3.PublicKey
  vault: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const acceptInvitationInstructionDiscriminator = [
  114, 70, 62, 248, 204, 49, 98, 239,
]

/**
 * Creates a _AcceptInvitation_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category AcceptInvitation
 * @category generated
 */
export function createAcceptInvitationInstruction(
  accounts: AcceptInvitationInstructionAccounts,
  args: AcceptInvitationInstructionArgs,
  programId = new web3.PublicKey('38foo9CSfPiPZTBvNhouNaYpvkzKEzWW396PUW2GKPVA')
) {
  const [data] = acceptInvitationStruct.serialize({
    instructionDiscriminator: acceptInvitationInstructionDiscriminator,
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
      pubkey: accounts.invitation,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.chief,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.memberAddressContainer,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.memberAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.membershipLock,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenProgram ?? splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
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
      pubkey: accounts.vault,
      isWritable: true,
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

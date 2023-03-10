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
  SendInvitationArgs,
  sendInvitationArgsBeet,
} from '../types/SendInvitationArgs'

/**
 * @category Instructions
 * @category SendInvitation
 * @category generated
 */
export type SendInvitationInstructionArgs = {
  args: SendInvitationArgs
}
/**
 * @category Instructions
 * @category SendInvitation
 * @category generated
 */
export const sendInvitationStruct = new beet.BeetArgsStruct<
  SendInvitationInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', sendInvitationArgsBeet],
  ],
  'SendInvitationInstructionArgs'
)
/**
 * Accounts required by the _sendInvitation_ instruction
 *
 * @property [] invitationId
 * @property [] guildKit
 * @property [_writable_] guild
 * @property [_writable_] invitation
 * @property [] chiefAddressContainer
 * @property [] invitedBy
 * @property [] invitingMint
 * @property [_writable_, **signer**] payer
 * @property [_writable_, **signer**] authority
 * @property [_writable_] vault
 * @category Instructions
 * @category SendInvitation
 * @category generated
 */
export type SendInvitationInstructionAccounts = {
  invitationId: web3.PublicKey
  guildKit: web3.PublicKey
  guild: web3.PublicKey
  invitation: web3.PublicKey
  chiefAddressContainer: web3.PublicKey
  invitedBy: web3.PublicKey
  invitingMint: web3.PublicKey
  payer: web3.PublicKey
  authority: web3.PublicKey
  vault: web3.PublicKey
  rent?: web3.PublicKey
  tokenProgram?: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const sendInvitationInstructionDiscriminator = [
  244, 206, 197, 215, 107, 35, 0, 186,
]

/**
 * Creates a _SendInvitation_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category SendInvitation
 * @category generated
 */
export function createSendInvitationInstruction(
  accounts: SendInvitationInstructionAccounts,
  args: SendInvitationInstructionArgs,
  programId = new web3.PublicKey('38foo9CSfPiPZTBvNhouNaYpvkzKEzWW396PUW2GKPVA')
) {
  const [data] = sendInvitationStruct.serialize({
    instructionDiscriminator: sendInvitationInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.invitationId,
      isWritable: false,
      isSigner: false,
    },
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
      pubkey: accounts.chiefAddressContainer,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.invitedBy,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.invitingMint,
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
      pubkey: accounts.rent ?? web3.SYSVAR_RENT_PUBKEY,
      isWritable: false,
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

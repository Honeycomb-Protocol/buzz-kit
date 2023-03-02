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
  CreateRequestArgs,
  createRequestArgsBeet,
} from '../types/CreateRequestArgs'

/**
 * @category Instructions
 * @category CreateRequest
 * @category generated
 */
export type CreateRequestInstructionArgs = {
  args: CreateRequestArgs
}
/**
 * @category Instructions
 * @category CreateRequest
 * @category generated
 */
export const createRequestStruct = new beet.BeetArgsStruct<
  CreateRequestInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', createRequestArgsBeet],
  ],
  'CreateRequestInstructionArgs'
)
/**
 * Accounts required by the _createRequest_ instruction
 *
 * @property [] requestId
 * @property [_writable_] guild
 * @property [_writable_] request
 * @property [_writable_] project
 * @property [] memberAddressContainer
 * @property [_writable_] memberAccount
 * @property [_writable_] member
 * @property [_writable_, **signer**] payer
 * @property [_writable_, **signer**] authority
 * @property [_writable_] vault
 * @category Instructions
 * @category CreateRequest
 * @category generated
 */
export type CreateRequestInstructionAccounts = {
  requestId: web3.PublicKey
  guild: web3.PublicKey
  request: web3.PublicKey
  project: web3.PublicKey
  memberAddressContainer: web3.PublicKey
  memberAccount: web3.PublicKey
  member: web3.PublicKey
  payer: web3.PublicKey
  authority: web3.PublicKey
  vault: web3.PublicKey
  rent?: web3.PublicKey
  tokenProgram?: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const createRequestInstructionDiscriminator = [
  219, 191, 93, 237, 18, 44, 42, 84,
]

/**
 * Creates a _CreateRequest_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CreateRequest
 * @category generated
 */
export function createCreateRequestInstruction(
  accounts: CreateRequestInstructionAccounts,
  args: CreateRequestInstructionArgs,
  programId = new web3.PublicKey('38foo9CSfPiPZTBvNhouNaYpvkzKEzWW396PUW2GKPVA')
) {
  const [data] = createRequestStruct.serialize({
    instructionDiscriminator: createRequestInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.requestId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.guild,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.request,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.project,
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
      pubkey: accounts.member,
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

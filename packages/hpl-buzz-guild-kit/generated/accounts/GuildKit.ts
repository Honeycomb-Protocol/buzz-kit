/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from '@solana/web3.js'
import * as beetSolana from '@metaplex-foundation/beet-solana'
import * as beet from '@metaplex-foundation/beet'

/**
 * Arguments used to create {@link GuildKit}
 * @category Accounts
 * @category generated
 */
export type GuildKitArgs = {
  kitKey: web3.PublicKey
  matrixId: string
  project: web3.PublicKey
  bump: number
}

export const guildKitDiscriminator = [46, 171, 148, 99, 107, 19, 187, 190]
/**
 * Holds the data for the {@link GuildKit} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class GuildKit implements GuildKitArgs {
  private constructor(
    readonly kitKey: web3.PublicKey,
    readonly matrixId: string,
    readonly project: web3.PublicKey,
    readonly bump: number
  ) {}

  /**
   * Creates a {@link GuildKit} instance from the provided args.
   */
  static fromArgs(args: GuildKitArgs) {
    return new GuildKit(args.kitKey, args.matrixId, args.project, args.bump)
  }

  /**
   * Deserializes the {@link GuildKit} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [GuildKit, number] {
    return GuildKit.deserialize(accountInfo.data, offset)
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link GuildKit} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<GuildKit> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    )
    if (accountInfo == null) {
      throw new Error(`Unable to find GuildKit account at ${address}`)
    }
    return GuildKit.fromAccountInfo(accountInfo, 0)[0]
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(
      '38foo9CSfPiPZTBvNhouNaYpvkzKEzWW396PUW2GKPVA'
    )
  ) {
    return beetSolana.GpaBuilder.fromStruct(programId, guildKitBeet)
  }

  /**
   * Deserializes the {@link GuildKit} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [GuildKit, number] {
    return guildKitBeet.deserialize(buf, offset)
  }

  /**
   * Serializes the {@link GuildKit} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return guildKitBeet.serialize({
      accountDiscriminator: guildKitDiscriminator,
      ...this,
    })
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link GuildKit} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */
  static byteSize(args: GuildKitArgs) {
    const instance = GuildKit.fromArgs(args)
    return guildKitBeet.toFixedFromValue({
      accountDiscriminator: guildKitDiscriminator,
      ...instance,
    }).byteSize
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link GuildKit} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    args: GuildKitArgs,
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      GuildKit.byteSize(args),
      commitment
    )
  }

  /**
   * Returns a readable version of {@link GuildKit} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      kitKey: this.kitKey.toBase58(),
      matrixId: this.matrixId,
      project: this.project.toBase58(),
      bump: this.bump,
    }
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const guildKitBeet = new beet.FixableBeetStruct<
  GuildKit,
  GuildKitArgs & {
    accountDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['kitKey', beetSolana.publicKey],
    ['matrixId', beet.utf8String],
    ['project', beetSolana.publicKey],
    ['bump', beet.u8],
  ],
  GuildKit.fromArgs,
  'GuildKit'
)

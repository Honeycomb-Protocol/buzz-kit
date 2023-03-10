import * as web3 from "@solana/web3.js"
import { getMembershipLockPda } from "../pdas";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { AcceptRequestArgs as AcceptRequestArgsChain, createAcceptRequestInstruction, PROGRAM_ID } from "../generated";
import { AddressContainerRole, createCtx, getAddressContainerPda, Honeycomb, OperationCtx, VAULT } from "@honeycomb-protocol/hive-control";

type CreateAcceptRequestCtx = {
    args: AcceptRequestArgsChain,
    programId?: web3.PublicKey,
    project: web3.PublicKey,
    guild_kit: web3.PublicKey,
    guild: web3.PublicKey,
    request: web3.PublicKey,
    member: web3.PublicKey,
    chiefNftMint: web3.PublicKey,
    memberNftMint: web3.PublicKey,
    payer: web3.PublicKey,
    authority: web3.PublicKey,
}
export function acceptRequestCtx(args: CreateAcceptRequestCtx): OperationCtx {

    const programId = args.programId || PROGRAM_ID;

    // PDAS
    const [membershipLock] = getMembershipLockPda(programId, args.guild, args.memberNftMint);
    const [chiefAddressContainer] = getAddressContainerPda(AddressContainerRole.ProjectMints, args.project, args.args.chiefRefrence.addressContainerIndex);
    const chiefAccount = getAssociatedTokenAddressSync(
        args.chiefNftMint,
        args.authority,
    )

    const memberAccount = getAssociatedTokenAddressSync(
        args.memberNftMint,
        args.member,
    )

    const instructions: web3.TransactionInstruction[] = [
        createAcceptRequestInstruction({
            guild: args.guild,
            guildKit: args.guild_kit,
            request: args.request,
            chiefAddressContainer,
            chiefAccount,
            memberAccount,
            member: args.member,
            membershipLock,
            payer: args.payer,
            authority: args.authority,
            vault: VAULT,
        }, {
            args: args.args
        })
    ]

    return {
        ...createCtx(instructions),
    };
}

export type acceptRequestArgs = {
    args: AcceptRequestArgsChain,
    programId?: web3.PublicKey,
    guild: web3.PublicKey,
    request: web3.PublicKey,
    member: web3.PublicKey,
    memberNftMint: web3.PublicKey,
    chiefNftMint: web3.PublicKey,
}
export async function acceptRequest(honeycomb: Honeycomb, args: acceptRequestArgs) {
    const ctx = acceptRequestCtx({
        ...args,
        payer: honeycomb.identity().publicKey,
        authority: honeycomb.identity().publicKey,
        project: honeycomb.project().projectAddress,
        guild_kit: honeycomb.guildKit().guildKitAddress,
    });

    return {
        response: await honeycomb.rpc().sendAndConfirmTransaction(ctx, {
            skipPreflight: true,
        }),
    };
}
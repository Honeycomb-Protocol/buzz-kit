import * as web3 from "@solana/web3.js";
import { AddressContainerRole, createCtx, getAddressContainerPda, Honeycomb, OperationCtx, VAULT } from "@honeycomb-protocol/hive-control";
import { createUpdateMemberRoleInstruction, UpdateMemberRoleArgs as UpdateMemberRoleArgsChain } from "../generated";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

type CreateUpdateMemberRoleCtx = {
    args: UpdateMemberRoleArgsChain,
    project: web3.PublicKey,
    guild_kit: web3.PublicKey,
    guild: web3.PublicKey,
    chiefNftMint: web3.PublicKey,
    memberNftMint: web3.PublicKey,
    payer: web3.PublicKey,
    authority: web3.PublicKey,
    programId?: web3.PublicKey,
}
export function updateMemberRoleCtx(args: CreateUpdateMemberRoleCtx): OperationCtx {
    const [addressContainer] = getAddressContainerPda(AddressContainerRole.ProjectMints, args.project, args.args.chiefRefrence.addressContainerIndex);
    const chiefAccount = getAssociatedTokenAddressSync(
        args.chiefNftMint,
        args.authority
    );

    const instructions: web3.TransactionInstruction[] = [
        createUpdateMemberRoleInstruction({
            project: args.project,
            guildKit: args.guild_kit,
            guild: args.guild,
            chiefAccount,
            addressContainer,
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

export type updateMemberRoleCtx = {
    args: UpdateMemberRoleArgsChain,
    guild: web3.PublicKey,
    chiefNftMint: web3.PublicKey,
    memberNftMint: web3.PublicKey,
    programId?: web3.PublicKey,
}
export async function updateMemberRole(honeycomb: Honeycomb, args: updateMemberRoleCtx) {
    const ctx = updateMemberRoleCtx({
        ...args,
        project: honeycomb.project().projectAddress,
        payer: honeycomb.identity().publicKey,
        authority: honeycomb.identity().publicKey,
        guild_kit: honeycomb.guildKit().guildKitAddress,
    });

    return {
        response: await honeycomb.rpc().sendAndConfirmTransaction(ctx, {
            skipPreflight: true,
        }),
    };
}
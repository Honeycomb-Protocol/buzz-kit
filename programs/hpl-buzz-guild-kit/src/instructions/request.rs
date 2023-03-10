use crate::errors::ErrorCode;
use {
    crate::state::*,
    anchor_lang::prelude::*,
    anchor_spl::token::{self, Token, TokenAccount},
    hpl_hive_control::{
        assertions::assert_indexed_reference,
        state::{AddressContainer, AddressContainerRole, IndexedReference},
    },
};

#[derive(Accounts)]
#[instruction(args: CreateRequestArgs)]
pub struct CreateRequest<'info> {
    /// Unique identifier for the guild
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub request_id: AccountInfo<'info>,

    /// Request state account
    #[account(
        init, payer = payer,
        space = Request::LEN,
        seeds = [
            b"request".as_ref(),
            guild.key().as_ref(),
            request_id.key().as_ref()
        ],
        bump
    )]
    pub request: Box<Account<'info, Request>>,

    /// GUILD KIT
    #[account()]
    pub guild_kit: Box<Account<'info, GuildKit>>,

    /// Guild state account
    #[account(mut, has_one = guild_kit)]
    pub guild: Box<Account<'info, Guild>>,

    /// Address container that stores the mint addresss of the collections
    #[account(
        constraint = member_address_container.role == AddressContainerRole::ProjectMints 
        && member_address_container.associated_with == guild_kit.project.key()
    )]
    pub member_address_container: Account<'info, AddressContainer>,

    /// Verify the owner of the mint
    #[account(mut, constraint= member_account.amount > 0 as u64)]
    pub member_account: Account<'info, TokenAccount>,

    /// the member account info of the member that is requesting
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    pub member: AccountInfo<'info>,

    /// the payer of the transaction
    #[account(mut)]
    pub payer: Signer<'info>,

    /// the payer of the transaction
    #[account(mut)]
    pub authority: Signer<'info>,

    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    pub vault: AccountInfo<'info>,

    /// RENT SYSVAR
    pub rent: Sysvar<'info, Rent>,

    /// TOKEN PROGRAM
    #[account(address = token::ID)]
    pub token_program: Program<'info, Token>,

    /// system program  
    pub system_program: Program<'info, System>,
}

#[derive(AnchorDeserialize, AnchorSerialize, Clone, Debug, PartialEq)]
pub struct CreateRequestArgs {
    pub new_member_refrence: IndexedReference,
}
pub fn create_request(ctx: Context<CreateRequest>, args: CreateRequestArgs) -> Result<()> {
    let request = &mut ctx.accounts.request;
    let guild = &mut ctx.accounts.guild;

    let member = &ctx.accounts.member;
    let member_account = &ctx.accounts.member_account;
    let member_address_container = &ctx.accounts.member_address_container;

    // Check if member reference is in the address container
    if !assert_indexed_reference(
        &args.new_member_refrence,
        member_address_container,
        member_account.mint,
    )
    .unwrap()
    {
        return Err(ErrorCode::MemberNotFound.into());
    }

    // CREATING INVITATION
    request.request_id = ctx.accounts.request_id.key();
    request.guild = guild.key();
    request.bump = ctx.bumps["request"];
    request.requested_by = member.key();

    Ok(())
}

// ACCEPT INVITATION INSTRUCTION
#[derive(Accounts)]
#[instruction(args: AcceptRequestArgs)]
pub struct AcceptRequest<'info> {
    /// GUILD KIT
    #[account()]
    pub guild_kit: Box<Account<'info, GuildKit>>,

    /// Guild state account
    #[account(mut, has_one = guild_kit)]
    pub guild: Box<Account<'info, Guild>>,

    /// Address container that stores the mint addresss of the collections
    #[account(mut, close = member, constraint = request.requested_by == member.key())]
    pub request: Box<Account<'info, Request>>,

    /// Address container that stores the mint addresss of the collections
    #[account(constraint = 
        chief_address_container.role == AddressContainerRole::ProjectMints
         && chief_address_container.associated_with == guild_kit.project.key()
    )]
    pub chief_address_container: Box<Account<'info, AddressContainer>>,

    /// Verify the owner of the mint
    #[account(mut, constraint= chief_account.amount > 0 as u64)]
    pub chief_account: Box<Account<'info, TokenAccount>>,

    /// Verify the owner of the mint
    #[account(mut, constraint= member_account.amount > 0 as u64)]
    pub member_account: Box<Account<'info, TokenAccount>>,

    /// the member that requested
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    pub member: AccountInfo<'info>,

    /// PDA FOR verifying membership & locking mebership
    #[account(
        init,
          seeds = [
              b"membership_lock".as_ref(),
              guild.key().as_ref(),
              member_account.mint.as_ref()
          ],
          bump,
          payer = payer,
          space = MembershipLock::LEN
      )]
    pub membership_lock: Box<Account<'info, MembershipLock>>,

    /// SPL TOKEN PROGRAM
    #[account(address = token::ID)]
    pub token_program: Program<'info, Token>,

    /// The wallet that pays for the rent
    #[account(mut)]
    pub payer: Signer<'info>,

    /// The wallet that pays for the rent
    #[account(mut)]
    pub authority: Signer<'info>,

    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    pub vault: AccountInfo<'info>,

    /// SYSTEM PROGRAM
    pub system_program: Program<'info, System>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct AcceptRequestArgs {
    pub chief_refrence: IndexedReference,
    pub new_member_refrence: IndexedReference,
}

/// Add a member to a guild
pub fn accept_request(ctx: Context<AcceptRequest>, args: AcceptRequestArgs) -> Result<()> {
    let guild = &mut ctx.accounts.guild;
    let member_lock = &mut ctx.accounts.membership_lock;
    let chief_account = &ctx.accounts.chief_account;
    let chief_address_container = &ctx.accounts.chief_address_container;

    // Check if member reference is in the address container
    if !assert_indexed_reference(
        &args.chief_refrence,
        chief_address_container,
        chief_account.mint,
    )
    .unwrap()
    {
        return Err(ErrorCode::MemberNotFound.into());
    }

    // adding member to the guild
    guild.members.push(Member {
        reference: args.new_member_refrence.clone(),
        role: MemberRole::Member,
    });

    // locking membership
    member_lock.guild = guild.key();
    member_lock.member_reference = args.new_member_refrence;

    Ok(())
}

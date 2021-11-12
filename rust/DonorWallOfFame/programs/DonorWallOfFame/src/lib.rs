use anchor_spl::{associated_token::AssociatedToken, token::Mint};

use {
    anchor_lang::{
        prelude::*
    },
    anchor_spl::{
        token::{self, Token, TokenAccount, Transfer}
    },
};

declare_id!("7WhXtFrss1nPQiFN87JzQRpFHSm6dt792BrTc6cFbZSm");

const DONOR_PDA_SEED: &[u8] = b"donor";

#[program]
pub mod donorhalloffame {

use super::*;
  pub fn entry_point(ctx: Context<EntryPoint>) -> ProgramResult {
    // Get a reference to the account.
    //let mut base_account = ctx.accounts.base_account.load_mut()?;
    msg!("initializing base_account...");

    let mut base_account = ctx.accounts.base_account.load_init()?;
    // Initialize total_gifs.
    base_account.total_donors = 0;

    msg!("initializing state_account...");

    let state_account = &mut ctx.accounts.state_account;

    state_account.base_account = *ctx.accounts.base_account.to_account_info().key;

    Ok(())
  }
    // Another function woo!
    pub fn add_donor(
        ctx: Context<AddDonor>, 
        twitter_handle: String, 
        donor_name: String, 
        donated_sol: u64,
        donated_token: Pubkey,
        donated_amount: u64,
        is_nft: bool,
        arweave_link: String,
        user_address: Pubkey,
    ) -> ProgramResult {

        msg!("Adding a new donor!");

        // Get a reference to the account and increment total_gifs.
        let mut base_account = ctx.accounts.base_account.load_mut()?;
        //let base_account = &mut ctx.accounts.base_account;
        let timestamp = ctx.accounts.clock.unix_timestamp;

        let ar_link_raw = arweave_link.as_bytes();
        let mut ar_link_arr = [0u8; 280];
        ar_link_arr[..ar_link_raw.len()].copy_from_slice(ar_link_raw);
        // construct the donated tokens object
        let donated_tokens_map = DonatedTokens {
            donated_token: donated_token,
            donated_amount: donated_amount, // TODO: make it so that only first is filled, others empty but still len 20
            timestamp: timestamp,
            is_nft: is_nft,
            arweave_link: ar_link_arr,
        };

        // convert Twitter handle to bytes
        let twitter_handle_raw = twitter_handle.as_bytes();
        let mut twitter_handle_arr = [0u8; 280];
        twitter_handle_arr[..twitter_handle_raw.len()].copy_from_slice(twitter_handle_raw);

        // convert donor name to bytes
        let donor_name_raw = donor_name.as_bytes();
        let mut donor_name_arr = [0u8; 280];
        donor_name_arr[..donor_name_raw.len()].copy_from_slice(donor_name_raw);
        // Build the struct.
        let item = DonorStruct {
            twitter_handle: twitter_handle_arr,
            donor_name: donor_name_arr,
            donated_sol: donated_sol,
            user_address: user_address,
            donated_token: donated_tokens_map // TODO: make it so that only first is filled, others empty but still len 20
        };

        msg!("Pushing");
        // Add it to the gif_list vector.
        //base_account.donor_list.push(item);

        base_account.append(item);

        

        msg!("Pushed! Adding...");
        base_account.total_donors += 1;


        msg!("Okeing");
/*         let nft_data = NFTData{
                name: "JOJO participation NFT".to_string(),
                symbol: "JPN".to_string(),
                uri:"https://arweave.net/UIar04lo7I_1_ypAk7FPD__TFeq8mFdJ0mIaFzjHGsU".to_string(),
                seller_fee_basis_points: 1000,
                creators: [
                    NFTCreator {
                        address: "juan3uxteK3E4ikyTeAg2AYRKzBS7CJ4dkGmx7zyHMv".to_string(),
                        verified: true,
                        share: 100
                    }
                ].to_vec()
            }; */

        Ok(())
    }

    pub fn send_sol(ctx: Context<SendSol>, amount: u64) -> ProgramResult {

        msg!("Sending some SOL...");

        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.from.key(),
            &ctx.accounts.to.key(),
            amount,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.from.to_account_info(),
                ctx.accounts.to.to_account_info(),
            ],
        )
    }

    pub fn init_mint(ctx: Context<InitMint>, mint_bump: u8) -> ProgramResult {
        anchor_spl::token::mint_to(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                anchor_spl::token::MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.destination.to_account_info(),
                    authority: ctx.accounts.mint.to_account_info(),
                },
                &[&[&[], &[mint_bump]]],
            ),
            1,
        )?;
        Ok(())
    }

    pub fn send_spl(ctx: Context<SendSpl>, amount: u64) -> ProgramResult {

        msg!("Sending some SPL tokens...");

        // Transferring from initializer to taker
        let (_pda, bump_seed) = Pubkey::find_program_address(&[DONOR_PDA_SEED], ctx.program_id);
        let seeds = &[&DONOR_PDA_SEED[..], &[bump_seed]];

        token::transfer(
            ctx.accounts
                .into_transfer_to_taker_context()
                .with_signer(&[&seeds[..]]),
            amount,
        )?;

        Ok(())
    }

    pub fn airdrop(ctx: Context<AirdropNFT>, mint_bump: u8) -> ProgramResult {
        msg!(
            "{} tokens have been minted so far...",
            ctx.accounts.mint.supply
        );
        anchor_spl::token::mint_to(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                anchor_spl::token::MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.destination.to_account_info(),
                    authority: ctx.accounts.mint.to_account_info(),
                },
                &[&[&[], &[mint_bump]]],
            ),
            1,
        )?;

        ctx.accounts.mint.reload()?;

        msg!(
            "{} tokens have been minted so far...",
            ctx.accounts.mint.supply
        );

        Ok(())
    }
}



// Attach certain variables to the StartStuffOff context.
#[derive(Accounts)]
pub struct EntryPoint<'info> {
    #[account(
        init, 
        payer = user, 
        seeds=[b"donor"], 
        bump
    )]
    pub state_account: Account<'info, StateAccount>,
    #[account(mut)]
    pub base_account: Loader<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: AccountInfo <'info>
}

// Adding a donor
#[derive(Accounts)]
pub struct AddDonor<'info> {
  #[account(
        seeds=[b"donor"],
        bump, 
        has_one=base_account
    )]
  pub state_account: Account<'info, StateAccount>,
  #[account(zero)]
  pub base_account: Loader<'info, BaseAccount>,
  pub clock: Sysvar<'info, Clock>
}

// Data struct for donor
#[zero_copy]
pub struct DonorStruct {
    pub twitter_handle: [u8; 280],
    pub donor_name: [u8; 280],
    pub donated_sol: u64,
    pub user_address: Pubkey,
    pub donated_token: DonatedTokens
}

#[zero_copy]
pub struct DonatedTokens {
    pub donated_token: Pubkey,
    pub donated_amount: u64,
    pub timestamp: i64,
    pub is_nft: bool,
    pub arweave_link: [u8; 280],
}

#[account]
#[derive(Default)]
pub struct StateAccount {
    pub base_account: Pubkey,
}

#[account(zero_copy)]
pub struct BaseAccount {
    head: u64,
    tail: u64,
    pub total_donors: u64,
    pub donor_list: [DonorStruct; 100]
}

impl BaseAccount {
    fn append(&mut self, donor_list_in: DonorStruct) {
        self.donor_list[BaseAccount::index_of(self.head)] = donor_list_in;
        if BaseAccount::index_of(self.head + 1) == BaseAccount::index_of(self.tail) {
            self.tail += 1;
        }
        self.head += 1;
    }
    fn index_of(counter: u64) -> usize {
        std::convert::TryInto::try_into(counter % 100).unwrap()
    }
}

#[derive(Accounts)]
pub struct SendSol<'info> {
    #[account(mut)]
    from: Signer<'info>,
    #[account(mut)]
    to: AccountInfo<'info>,
    system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct SendSpl<'info> {
    #[account(mut)]
    from: Signer<'info>,
    #[account(mut)]
    from_account: Account<'info, TokenAccount>,
    #[account(mut)]
    to: AccountInfo<'info>,
    #[account(mut)]
    to_account: Account<'info, TokenAccount>,
    #[account(seeds=[b"donor".as_ref()], bump)]
    pda_account: AccountInfo<'info>,
    token_program: Program<'info, Token>
}

#[derive(Accounts)]
#[instruction(mint_bump: u8)]
pub struct InitMint<'info> {
    #[account(
        init,
        payer = payer,
        seeds = [],
        bump = mint_bump,
        mint::decimals = 0,
        mint::authority = mint
    )]
    pub mint: Account<'info, Mint>,

    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(init_if_needed, payer = payer, associated_token::mint = mint, associated_token::authority = payer)]
    pub destination: Account<'info, TokenAccount>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct AirdropNFT<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,

    #[account(
        init_if_needed,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = payer
    )]
    pub destination: Account<'info, TokenAccount>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}

impl<'info> SendSpl<'info> {
    fn into_transfer_to_taker_context(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let cpi_accounts = Transfer {
            from: self.from_account.to_account_info().clone(),
            to: self.to_account.to_account_info().clone(),
            authority: self.from.to_account_info().clone(),
        };
        let cpi_program = self.token_program.to_account_info();
        CpiContext::new(cpi_program, cpi_accounts)
    }
}

impl<'info> AirdropNFT<'info> {
    fn into_transfer_to_taker_context(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let cpi_accounts = Transfer {
            from: self.mint.to_account_info().clone(),
            to: self.destination.to_account_info().clone(),
            authority: self.mint.to_account_info().clone(),
        };
        let cpi_program = self.token_program.to_account_info();
        CpiContext::new(cpi_program, cpi_accounts)
    }
}


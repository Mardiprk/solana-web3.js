import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";

const connection = new Connection("https://api.devnet.solana.com","confirmed");

async function createMyFirstToken(){
    try{
        const payer = Keypair.generate();
        console.log("Token Wallet: ", payer.publicKey.toBase58());

        // requesting lamports
        const signature = await connection.requestAirdrop(payer.publicKey, 1 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(signature);
        console.log("Received 1 SOL");

        const mint = await createMint(
            connection,
            payer,
            payer.publicKey,
            null,
            9
        );

        console.log("🎉 Token created successfully!");
        console.log("Token Mint address: ", mint.toBase58());
        console.log("View on Solscan:", `https://solscan.io/token/${mint.toBase58()}?cluster=devnet`);

        console.log("📝 SAVE THIS MINT ADDRESS - you'll need it later!");
    }catch(error){
        console.log("Error Creating Token: ", error)
    }
}

createMyFirstToken();
import { Keypair, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

//connection set
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

async function requestAirdrop() {
    try{
        const keypair = Keypair.generate();
        console.log("Wallet: ", keypair.publicKey.toBase58());

        //checking initial bal
        const initialBal = await connection.getBalance(keypair.publicKey);
        console.log("Wallet Balance", initialBal / LAMPORTS_PER_SOL);

        // requesting 1 SOL
        const airdropSOL = await connection.requestAirdrop(
            keypair.publicKey,
            1 * LAMPORTS_PER_SOL
        );

        console.log("⏳ Waiting for confirmation...");
        await connection.confirmTransaction(airdropSOL);

        const newBalance = await connection.getBalance(keypair.publicKey);
        console.log("Wallet Balance", newBalance / LAMPORTS_PER_SOL);

        console.log("=====================================");
        console.log("📝 Save this info if you want to use this wallet again:");
        console.log("Public Key:", keypair.publicKey.toBase58());
        console.log("Secret Key:", Array.from(keypair.secretKey));

    }catch(e){
        console.error("❌ Error requesting airdrop:", e);
        console.log("💡 Note: Devnet faucet has rate limits. Try again later if it fails.");
    }
}

requestAirdrop();
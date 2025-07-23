import { Keypair, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

// connection has been set to devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

async function checkBalance(){
    try{
        const keypair = Keypair.generate();
        console.log("Getting Bal for:", keypair.publicKey.toBase58());

        const balanceLamports = await connection.getBalance(keypair.publicKey);
        const balanceSOL = balanceLamports / LAMPORTS_PER_SOL;
        
        console.log("Balance in LAMPORTS", balanceLamports);
        console.log("Balance in LAMPORTS", balanceSOL);

        if (balanceSOL === 0){
            console.log("This is a new wallet with 0 SOL");
        }
    }catch (e){
        console.error("❌ Error checking balance:", e);
    }
}

checkBalance();
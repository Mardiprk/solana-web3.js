import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getOrCreateKeypair } from "./keypair-manager";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

async function inspectAccount(publicKey: PublicKey) {
    try {
        console.log("🔍 Inspecting Account:", publicKey.toBase58());
        console.log("=====================================");
        
        // 1. Basic account info
        const accountInfo = await connection.getAccountInfo(publicKey);
        
        if (!accountInfo) {
            console.log("❌ Account not found (never been used)");
            return;
        }
        
        console.log("✅ Account exists!");
        console.log("💰 Balance:", accountInfo.lamports / LAMPORTS_PER_SOL, "SOL");
        console.log("👤 Owner:", accountInfo.owner.toBase58());
        console.log("📊 Data length:", accountInfo.data.length, "bytes");
        console.log("🏠 Executable:", accountInfo.executable);
        console.log("💳 Rent Epoch:", accountInfo.rentEpoch);
        
        // 2. Check if it's a system account
        const SYSTEM_PROGRAM = "11111111111111111111111111111111";
        if (accountInfo.owner.toBase58() === SYSTEM_PROGRAM) {
            console.log("🏦 This is a System Program account (regular wallet)");
        }
        
        // 3. Transaction history (recent signatures)
        console.log("=====================================");
        console.log("📜 Recent Transaction History:");
        
        const signatures = await connection.getSignaturesForAddress(
            publicKey,
            { limit: 5 } // Get last 5 transactions
        );
        
        if (signatures.length === 0) {
            console.log("📝 No transactions found");
        } else {
            for (const sig of signatures) {
                console.log("🔗", sig.signature);
                console.log("   ⏰ Slot:", sig.slot);
                console.log("   📅 Block Time:", new Date(sig.blockTime! * 1000).toLocaleString());
                console.log("   ✅ Status:", sig.err ? "Failed" : "Success");
                console.log("   🌐 View: https://solscan.io/tx/" + sig.signature + "?cluster=devnet");
                console.log("");
            }
        }
        
    } catch (error) {
        console.error("❌ Error inspecting account:", error);
    }
}

async function compareAccounts() {
    console.log("🔍 Account Comparison Demo");
    console.log("=====================================");
    
    // Your wallet
    const myKeypair = getOrCreateKeypair();
    await inspectAccount(myKeypair.publicKey);
    
    console.log("\n" + "=".repeat(50) + "\n");
    
    // A well-known account (Solana Foundation's account)
    const solanaFoundation = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
    console.log("Comparing with USDC Token Mint Account:");
    await inspectAccount(solanaFoundation);
}

// Run the comparison
compareAccounts();
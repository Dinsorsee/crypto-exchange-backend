import { mongodb } from "./datasource/db";
import { UserService } from "./service/UserService";
import { WalletService } from "./service/WalletService";
import { OrderService } from "./service/OrderService";
import { TransactionService } from "./service/TransactionService";

async function seed() {
  try {
    await mongodb.connect();
    console.log("Starting seed data...");

    const userService = new UserService();
    const walletService = new WalletService();
    const orderService = new OrderService();
    const transactionService = new TransactionService();

    const user1 = await userService.createUser(
      "alice@test.com",
      "hashed_password_alice",
    );
    const user2 = await userService.createUser(
      "bob@test.com",
      "hashed_password_bob",
    );
    console.log("✅ Users created:", user1.email, user2.email);

    const aliceTHB = await walletService.createFiatWallet(user1._id!, 1000000);
    const aliceBTC = await walletService.createCryptoWallet(user1._id!, 5);

    const bobTHB = await walletService.createFiatWallet(user2._id!, 50000);
    const bobBTC = await walletService.createCryptoWallet(user2._id!, 0);

    console.log("✅ Wallets created");

    const sellOrder1 = await orderService.createOrder({
      userId: user1._id!,
      orderType: "SELL",
      crypto: "BTC",
      fiat: "THB",
      price: 1200000,
      amount: 2,
      status: "OPEN",
    });

    const buyOrder1 = await orderService.createOrder({
      userId: user2._id!,
      orderType: "BUY",
      crypto: "BTC",
      fiat: "USD",
      price: 45000,
      amount: 1,
      status: "OPEN",
    });

    console.log("✅ Orders created");

    await transactionService.createTransaction({
      userId: user1._id!,
      type: "CRYPTO_TRANSFER",
      currency: "BTC",
      amount: 1,
      fromWalletId: aliceBTC._id!,
      toWalletId: bobBTC._id!,
      txHash: "0x1234567890abcdef",
    });

    await transactionService.createTransaction({
      userId: user2._id!,
      type: "FIAT_TRANSFER",
      currency: "THB",
      amount: 5000,
      fromWalletId: bobTHB._id!,
      toWalletId: aliceTHB._id!,
      txHash: "beef0000000000001",
    });

    console.log("✅ Transactions created");
    console.log("Seed completed! You can now test the API with sample data.");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();

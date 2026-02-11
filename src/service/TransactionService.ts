import { TransactionRepository } from "../datasource/transaction-repository";
import { TransactionEntity } from "../entity/TransactionEntity";
import { ObjectId, OptionalId } from "mongodb";

export class TransactionService {
  private transactionRepository = new TransactionRepository();

  async createTransaction(
    tx: OptionalId<TransactionEntity>,
  ): Promise<TransactionEntity> {
    return this.transactionRepository.create(tx);
  }

  async getTransactionById(
    id: string | ObjectId,
  ): Promise<TransactionEntity | null> {
    return this.transactionRepository.findById(id);
  }

  async getUserTransactions(
    userId: string | ObjectId,
  ): Promise<TransactionEntity[]> {
    return this.transactionRepository.findByUserId(userId);
  }

  async getAllTransactions(): Promise<TransactionEntity[]> {
    return this.transactionRepository.findAll();
  }
}

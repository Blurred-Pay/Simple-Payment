import {
  Horizon,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  Operation,
  Asset,
} from '@stellar/stellar-sdk';

const HORIZON_URL = 'https://horizon-testnet.stellar.org';
const server = new Horizon.Server(HORIZON_URL);

export async function getBalance(publicKey: string): Promise<string> {
  const account = await server.loadAccount(publicKey);
  const xlmBalance = account.balances.find((b: any) => b.asset_type === 'native');
  return xlmBalance ? xlmBalance.balance : '0';
}

export async function sendXlm(
  publicKey: string,
  destination: string,
  amount: string
): Promise<string> {
  const account = await server.loadAccount(publicKey);

  const transaction = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.payment({
        destination,
        asset: Asset.native(),
        amount,
      })
    )
    .setTimeout(30)
    .build();

  const xdr = transaction.toXDR();

  const { signTransaction } = await import('@stellar/freighter-api');
  const { signedTxXdr } = await signTransaction(xdr, {
    networkPassphrase: Networks.TESTNET,
  });

  const signedTransaction = TransactionBuilder.fromXDR(
    signedTxXdr,
    Networks.TESTNET
  );

  const result = await server.submitTransaction(signedTransaction);
  return result.hash;
}

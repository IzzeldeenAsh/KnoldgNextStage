import InsighterTransactionsTab from './components/InsighterTransactionsTab';

export default function InsighterWalletTransactionsPage({ params }: { params: { id: string } }) {
  return <InsighterTransactionsTab insighterId={params.id} />;
}


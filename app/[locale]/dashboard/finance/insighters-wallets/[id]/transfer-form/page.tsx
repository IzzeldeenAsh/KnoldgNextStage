import TransferFormTab from './components/TransferFormTab';

export default function InsighterTransferFormPage({ params }: { params: { id: string } }) {
  return <TransferFormTab insighterId={params.id} />;
}


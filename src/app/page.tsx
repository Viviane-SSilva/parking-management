import ParkingGrid from '@/components/ParkingGrid';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ParkingGrid totalSpots={50} />
    </main>
  );
}


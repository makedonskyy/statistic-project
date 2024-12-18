import { MainLayout } from "@/components/layouts/main-layout";
import { BreedVoteForm } from "@/components/vote-form";

export default function Home() {
  return (
    <MainLayout>
      <BreedVoteForm />
    </MainLayout>
  );
}

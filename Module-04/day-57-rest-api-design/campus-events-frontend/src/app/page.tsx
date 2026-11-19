import { Suspense } from "react";
import CustomErrorBoundary from "./custom-error-boundary";
import UpcomingWrapper from "./UpcomingWrapper";
import EventSkeleton from "@/components/EventSkeleton";

export default function Home() {
  return (
    <section className="p-2 bg-zinc-100">
      <p>Discover What's Happening on Campus</p>
      <p>Find workshops, technology events and activities.</p>
      <h1 className="text-3xl mt-4 mb-2">Upcoming Events</h1>
      <Suspense fallback={<EventSkeleton />}>
        <CustomErrorBoundary title="Fetch Error">
          <UpcomingWrapper />
        </CustomErrorBoundary>
      </Suspense>
    </section>
  );
}

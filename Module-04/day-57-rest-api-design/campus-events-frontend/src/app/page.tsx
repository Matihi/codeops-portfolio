import { Suspense } from "react";
import CustomErrorBoundary from "./custom-error-boundary";
import UpcomingWrapper from "./UpcomingWrapper";
import EventSkeleton from "@/components/EventSkeleton";

export default function Home() {
  return (
    <section>
      <p>Discover What's Happening on Campus</p>
      <p>Find workshops, technology events and activities.</p>
      <h1>Upcoming Events</h1>
      <Suspense fallback={<EventSkeleton />}>
        <CustomErrorBoundary title="Fetch Error">
          <UpcomingWrapper />
        </CustomErrorBoundary>
      </Suspense>
    </section>
  );
}

import { Suspense } from "react";
import EventsWrapper from "./EventsWrapper";
import CustomErrorBoundary from "@/app/custom-error-boundary";
import EventSkeleton from "@/components/EventSkeleton";

const EVENTS_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL!}/events`;

const EventsPage = () => {
  return (
    <section className="p-2 h-full">
      <h1 className="text-3xl text-zinc-700 py-2">
        What&rsquo;s Happening on Campus?
      </h1>
      <p className="text-sm">
        Our all-access pass to student club meetups, guest speakers, sports, and
        weekend festivals.
      </p>
      <Suspense fallback={<EventSkeleton />}>
        <CustomErrorBoundary title="Fetch Error">
          <EventsWrapper url={EVENTS_URL} />
        </CustomErrorBoundary>
      </Suspense>
    </section>
  );
};

export default EventsPage;

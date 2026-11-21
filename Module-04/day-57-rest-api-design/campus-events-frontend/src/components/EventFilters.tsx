"use client";

import { capitalizeFirstLetter } from "@/services/format";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface EventFiltersProps {
  categories: string[];
  locations: string[];
  publicationStatuses: boolean[];
}

const EventFilters = ({
  categories,
  locations,
  publicationStatuses,
}: EventFiltersProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const newCategories = [...new Set(categories)];

  const handleCategorySelection = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set("category", e.target.value);
      params.set("page", "1");
    } else {
      params.delete("category");
    }

    push(`${pathname}?${params.toString()}`);
  };

  const handleLocationSelection = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set("location", e.target.value);
      params.set("page", "1");
    } else {
      params.delete("location");
    }
    push(`${pathname}?${params.toString()}`);
  };

  const handlePublicationStatusSelection = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set("publication", e.target.value);
      params.set("page", "1");
    } else {
      params.delete("publication");
    }
    push(`${pathname}?${params.toString()}`);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      if (e.target.value === "default") {
        params.delete("sortBy");
      } else {
        params.set("sortBy", e.target.value);
      }
      params.set("page", "1");
    } else {
      params.delete("sortBy");
    }
    push(`${pathname}?${params.toString()}`);
  };

  const handleOrderSelection = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      if (e.target.value === "default") {
        params.delete("order");
      } else {
        params.set("order", e.target.value);
      }
      params.set("page", "1");
    } else {
      params.delete("order");
    }
    push(`${pathname}?${params.toString()}`);
  };

  newCategories.unshift("all");
  const newLocations = [...new Set(locations)];
  newLocations.unshift("all");
  const newPublicationStatuses: string[] = publicationStatuses.map(
    (pubStatus) => (pubStatus === true ? "published" : "not published"),
  );
  newPublicationStatuses.unshift("all");

  const categoryOptions = newCategories.map((category) => (
    <option key={category} value={category}>
      {capitalizeFirstLetter(category)}
    </option>
  ));

  const locationOptions = newLocations.map((location) => (
    <option key={location} value={location}>
      {capitalizeFirstLetter(location)}
    </option>
  ));

  const publicationStatusOptions = newPublicationStatuses.map((pubStatus) => (
    <option key={pubStatus} value={pubStatus}>
      {capitalizeFirstLetter(pubStatus)}
    </option>
  ));

  return (
    <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
      <label htmlFor="categories">Category:</label>
      <select
        name="categories"
        id="categories"
        className="bg-[#128a93] rounded-md w-fit"
        onChange={(e) => handleCategorySelection(e)}
      >
        {categoryOptions}
      </select>
      <label htmlFor="locations">Location:</label>
      <select
        name="locations"
        id="locations"
        className="bg-[#128a93] rounded-md w-fit"
        onChange={(e) => handleLocationSelection(e)}
      >
        {locationOptions}
      </select>

      <label htmlFor="publication-statuses">Publication:</label>

      <select
        name="publication-statuses"
        id="publication-statuses"
        className="bg-[#128a93] rounded-md w-fit"
        onChange={(e) => handlePublicationStatusSelection(e)}
      >
        {publicationStatusOptions}
      </select>

      <label htmlFor="sort">Sort by:</label>
      <select
        name="sort"
        id="sort"
        className="bg-[#128a93] rounded-md w-fit"
        onChange={(e) => handleSort(e)}
      >
        <option value="default">Default</option>
        <option value="eventDate">Event Date</option>
        <option value="title">Title</option>
      </select>

      <label htmlFor="order">Sort order:</label>
      <select
        name="order"
        id="order"
        className="bg-[#128a93] rounded-md w-fit"
        onChange={(e) => handleOrderSelection(e)}
      >
        <option value="default">Default</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default EventFilters;

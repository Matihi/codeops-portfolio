#### How filtering, sorting and pagination work

After we collect the query parameters and validate against constraints in FindEventsQueryDto, we filter by category, location and/or isPublished. We then change the eventDate field to Iso string to make it easier for sorting, we sort by eventDate or title in ascending or descending order. We get the number of total items and calculate `offset`, `start` and `end` based on specified page number and limit, we use `slice(start, end)` to get the items per page and calculate total pages. Finally we return a consistent object with type `Page<T>`

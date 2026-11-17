import useSWR from "swr";
import { getData } from "../../lib/fetcher";
import EventList from "../../components/EventList/EventList";
const Home = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/events`;
  const { data, error, isLoading } = useSWR(url, getData);
  return <EventList items={data?.items} error={error} isLoading={isLoading} />;
};

export default Home;

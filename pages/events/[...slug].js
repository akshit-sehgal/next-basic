import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { getFilteredEvents } from '../../helpers/apiUtils';

const fetcher = (url)=>fetch(url).then((resp)=>resp.json());

const FilteredEventsPage = () => {

  const { query: { slug: filterData } } = useRouter();

  const [events, setEvents] = useState();
  
  const { data, error } = useSWR('https://next-temp.firebaseio.com/events.json', fetcher);

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        })
      }
      setEvents(events);
    }
  }, [data]);

  if (!events) {
    return (
      <p className='center'>Loading...</p>
    );
  }

  const [year, month] = filterData;
  const numYear = +year;
  const numMonth = +month;

  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2022 || numYear < 2021 || numMonth > 12 || numMonth < 1 || error) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid Filters</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  if (!filteredEvents.length) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found.</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filterDate = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={filterDate} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
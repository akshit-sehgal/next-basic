import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/ErrorAlert';

const FilteredEventsPage = () => {
  const { query: { slug: filterData } } = useRouter();

  if (!filterData) {
    return (
      <p className='center'>Loading...</p>
    );
  }

  const [year, month] = filterData;
  const numYear = +year;
  const numMonth = +month;
  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2022 || numYear < 2021 || numMonth > 12 || numMonth < 1) {
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

  const events = getFilteredEvents({
    year: numYear,
    month: numMonth
  });

  if (!events || !events.length) {
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
      <EventList items={events} />
    </Fragment>
  );
};

export default FilteredEventsPage;
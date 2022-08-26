import React, { Fragment } from 'react';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { getFilteredEvents } from '../../helpers/apiUtils';

const FilteredEventsPage = (props) => {
  const { events, numYear, numMonth, hasError } = props;

  if (hasError) {
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

export const getServerSideProps = async (ctx) => {
  const { params } = ctx;

  const filterData = params.slug;

  const [year, month] = filterData;
  const numYear = +year;
  const numMonth = +month;
  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2022 || numYear < 2021 || numMonth > 12 || numMonth < 1) {
    return {
      props:{
        hasError: true
      }
    }
  }

  const events = await getFilteredEvents({
    year: numYear,
    month: numMonth
  });

  if (!events || !events.length) {
    return {
      props:{
        hasError: true
      }
    }
  }
  return {
    props: {
      events,
      numYear,
      numMonth
    }
  };
};

export default FilteredEventsPage;
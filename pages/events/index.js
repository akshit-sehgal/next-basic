import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventSearch';
import { getAllEvents } from '../../dummy-data';

const AllEventsPage = () => {
  const { push } = useRouter();

  const events = getAllEvents();

  const findEventsHandler = (year, month)=>{
    push(`/events/${year}/${month}`);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events}/>
    </Fragment>
  );
};

export default AllEventsPage;
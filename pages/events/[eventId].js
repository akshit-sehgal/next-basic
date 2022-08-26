import React, { Fragment } from 'react';
import Head from 'next/head';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { getFeaturedEvents, getEventById } from '../../helpers/apiUtils';

const EventDetailsPage = (props) => {
  const { selectedEvent: event } = props;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No Event Found</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description}></meta>
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps = async (ctx) => {
  const { eventId } = ctx.params;
  const event = await getEventById(eventId);
  console.log('Static Props', eventId);

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30
  }
};

export const getStaticPaths = async ()=>{
  const events = await getFeaturedEvents();
  const paths = events.map((event)=>({params:{eventId: event.id}}));

  return {
    paths,
    fallback: 'blocking'
  };
}

export default EventDetailsPage;
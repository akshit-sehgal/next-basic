import React from 'react';
import Head from 'next/head';
import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../helpers/apiUtils';

const HomePage = (props) => {
  const { featuredEvents } = props;

  return (
    <div>
      <Head>
        <title>Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve."></meta>
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
};


export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents
    },
    revalidate: 60 * 30 // half an hour
  }
};

export default HomePage;
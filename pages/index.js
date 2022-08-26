import React from 'react';
import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../helpers/apiUtils';

const HomePage = (props) => {
  const { featuredEvents } = props;

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};


export const getStaticProps = async ()=>{
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents
    },
    revalidate: 60 * 30 // half an hour
  }
};

export default HomePage;
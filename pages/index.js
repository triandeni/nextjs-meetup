import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

export async function getStaticProps() {
  //fetch data from api
  const client = await MongoClient.connect(
    'mongodb+srv://trian_deni:Koboi666@meetups.oubmzi3.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;

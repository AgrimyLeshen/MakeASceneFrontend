"use client";
import { useState} from 'react';
import Header from "@/components/layout/Header";
import { testPosts } from "@/testdata/EventPostData";
import EventList from "@/app/oldJsVersion/components/EventList"


export default function MyScenePage(){

    const [events, setEvents] = useState(testPosts);

    return(
        <>
            <Header/>
            <div className='pt-12'>
                <EventList events={events}/>
            </div>
        </>
    );
};
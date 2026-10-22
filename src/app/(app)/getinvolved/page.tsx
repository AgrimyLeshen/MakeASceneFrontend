"use client";
import { useState} from 'react';
import Header from "@/components/layout/Header";
import { testPosts } from "@/testdata/EventPostData";
import EventList from "@/app/oldJsVersion/components/EventList"

export default function GetInvolvedPage(){

    const [events, setEvents] = useState(testPosts);

    return(
        <>
            <Header
            />
            <div className='pt-12'>
                <p className='text-white'>involment</p>
            </div>
        </>
    );

};
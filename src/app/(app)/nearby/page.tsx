"use client";
import { useState} from 'react';
import Header from "@/components/layout/Header";
import { testPosts } from "@/testdata/EventPostData";
import EventList from "@/app/oldJsVersion/components/EventList"
import { Filter, FilterData, FilterState } from "@/components/forms/Filter";
import FilterList from '@/components/forms/FilterList';


const filters: FilterData[] = [
  { id: "music", name: "Musik" },                                   // none
  { id: "sport", name: "Sport", selection: "include" },             // include
  { id: "ads", name: "Werbung", selection: "exclude" },             // exclude
  { id: "news", name: "News", mark: "subscribed", selection: "include" }, // subscribed + include
  { id: "talk", name: "Talk", mark: "subscribed", selection: "exclude" }, // subscribed + exclude
  { id: "spam", name: "Spam", mark: "blocked" },                    // blocked (always exclude)
];

export default function NearbyPage(){

    const [events, setEvents] = useState(testPosts);

    return(
        <>
            <Header
            />
            <div className='pt-12'>
                <FilterList filters={filters} onFilterChange={(id, state) => console.log(id, state)} />
            </div>
        </>
    );

};
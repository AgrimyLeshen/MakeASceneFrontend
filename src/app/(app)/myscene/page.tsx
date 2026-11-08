"use client";
import { useState} from 'react';
import Header from "@/components/layout/Header";
import { testPosts } from "@/testdata/EventPostData";
import EventList from "@/components/events/EventList"
import FilterContent from '@/components/forms/FilterContent';
import { FilterData } from '@/components/forms/Filter';
import MenuContent from '@/components/forms/HamburgerContent';
import PageContent from '@/components/layout/PageContent';


const filters: FilterData[] = [
  { id: "music", name: "Musik" },                                   // none
  { id: "sport", name: "Sport", selection: "include" },             // include
  { id: "ads", name: "Werbung", selection: "exclude" },             // exclude
  { id: "news", name: "News", mark: "subscribed", selection: "include" }, // subscribed + include
  { id: "talk", name: "Talk", mark: "subscribed", selection: "exclude" }, // subscribed + exclude
  { id: "spam", name: "Spam", mark: "blocked" },                    // blocked (always exclude)
];

export default function MyScenePage(){

    const [events, setEvents] = useState(testPosts);

    return(
        <>
            <Header
                filterContent={
                    <FilterContent
                        subscribedTags={filters}
                        locations={filters}
                        whatTags={filters}
                        blockedTags={filters}
                        onChange={(v) => console.log(v)}
                    />
                } 
                menuContent={
                    <MenuContent
                        initiatives={[
                            { id: "a", name: "Initiative Name", hasNotification: true, href: "/initiative/a" },
                            { id: "b", name: "Initiative Name", href: "/initiative/b" },
                        ]}
                        hasUnreadNotifications={true}
                        //onNewInitiative={() => router.push("/initiative/new")}
                    />
                }           
            />
            <PageContent className='mt-20'>
                <EventList events={events}/>
            </PageContent>
        </>
    );
};
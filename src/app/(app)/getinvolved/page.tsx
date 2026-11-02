"use client";
import { useState} from 'react';
import Header from "@/components/layout/Header";
import { testPosts } from "@/testdata/EventPostData";
import EventList from "@/app/oldJsVersion/components/EventList"
import ThemeScope from '@/components/ui/ThemeScope';
import FilterContent from '@/components/forms/FilterContent';
import { FilterData } from '@/components/forms/Filter';
import MenuContent from '@/components/forms/HamburgerContent';

const filters: FilterData[] = [
  { id: "music", name: "Musik" },                                   // none
  { id: "sport", name: "Sport", selection: "include" },             // include
  { id: "ads", name: "Werbung", selection: "exclude" },             // exclude
  { id: "news", name: "News", mark: "subscribed", selection: "include" }, // subscribed + include
  { id: "talk", name: "Talk", mark: "subscribed", selection: "exclude" }, // subscribed + exclude
  { id: "spam", name: "Spam", mark: "blocked" },                    // blocked (always exclude)
];


export default function GetInvolvedPage(){

    const [events, setEvents] = useState(testPosts);

    return(
        <ThemeScope themeId='midnight'>
            <Header
                filterContent={
                    <FilterContent
                        sections={["what", "where", "when", "blocked"]}
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
            <div className='pt-12'>
                <p className='text-white'>involment</p>
            </div>
        </ThemeScope>
    );

};
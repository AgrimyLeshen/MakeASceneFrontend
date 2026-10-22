"use client";
import { useState} from 'react';
import Header from "@/components/layout/Header";
import { testPosts } from "@/testdata/EventPostData";
import EventList from "@/app/oldJsVersion/components/EventList"
import ThemeScope from '@/components/ui/ThemeScope';

export default function GetInvolvedPage(){

    const [events, setEvents] = useState(testPosts);

    return(
        <ThemeScope themeId='sunset'>
            <Header
            />
            <div className='pt-12'>
                <p className='text-white'>involment</p>
            </div>
        </ThemeScope>
    );

};
"use client";
import { useState, useEffect } from 'react';
import '../css/EventListLayouts.css';
import '../css/YourScene.css';
import EventCard from '../components/EventCard';
import EventList from '../components/EventList';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Filterbar from '../components/Filterbar';
import { testPosts } from "../../../testdata/EventPostData";

function YourScene() {
    const [events, setEvents] = useState(testPosts);
    const [activeSetting, setActiveSetting] = useState("MyScene");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isFilterbarOpen, setIsFilterbarOpen] = useState(false);

    const [debugLocation, setDebugLocation] = useState("");
    const [debugTags, setDebugTags] = useState("");

    const filter = {
        initiatives: {
            subscribed: [
                { name: "Subscribed Initiative", setting: "include" },
            ],
            common: [
                { name: "Common Initiative", setting: "none" },
            ],
        },
        tags: {
            subscribed: [
                { name: "Subscribed Tag", setting: "exclude" },
            ],
            common: [
                { name: "Tech", setting: "include" },
                { name: "Art", setting: "none" },
            ],
        },
        location: {
            subscribed: [
                { name: "Berlin", setting: "include" },
            ],
        },
        ageGuides: [
            { name: "18+", setting: "none" },
        ],
    };


    return (
        <div className="your-scene">
            <Header 
                activeSetting={activeSetting} 
                setActiveSetting={setActiveSetting} 
                onSidebarClick={() => setIsSidebarOpen(prev => !prev)}
                onFilterbarClick={() => setIsFilterbarOpen(prev => !prev)}/>
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
                initiatives={[{id: 1, name: "Your Iniciative", image: "/images/image.png"}]}
            />
            <Filterbar
                isOpen={isFilterbarOpen}
                onClose={() => setIsFilterOpen(false)}
                filter={filter}
            />

            <EventList events={events} />
        </div>
    );
}

export default YourScene;

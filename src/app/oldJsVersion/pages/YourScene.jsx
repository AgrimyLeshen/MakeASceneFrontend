"use client";
import { useState, useEffect } from 'react';
import '../css/EventListLayouts.css';
import '../css/YourScene.css';
import EventCard from '../components/EventCard';
import EventList from '../components/EventList';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Filterbar from '../components/Filterbar';

function YourScene() {
    const [events, setEvents] = useState([]);
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

    useEffect(() => {
    // simulate backend 
    const fetchedEvents = [
    {
      id: 1,
      title: "Event Title 1",
      initiativeName: "Initiative A",
      initiativeImage: "/images/image.png",
      isFavorite: true,
      date: "18.05.2026",
      description: "Description 1",
      banner: "/images/image.png",
      layout: "hero"
    },
    {
      id: 2,
      title: "Event Title 2",
      initiativeName: "Initiative B",
      initiativeImage: "/images/image.png",
      isFavorite: false,
      date: "19.05.2026",
      description: "Description 2",
      banner: "/images/image.png",
      layout: "compact"
    },
    {
      id: 3,
      title: "Green Future Workshop",
      initiativeName: "Eco Initiative",
      initiativeImage: "/images/image.png",
      isFavorite: false,
      date: "20.05.2026",
      description: "A workshop focused on sustainability and climate action.",
      banner: "/images/image.png",
      layout: "split"
    },
    {
      id: 4,
      title: "Tech Meetup Berlin",
      initiativeName: "Dev Community",
      initiativeImage: "/images/image.png",
      isFavorite: true,
      date: "22.05.2026",
      description: "Networking event for developers and tech enthusiasts.",
      banner: "/images/image.png",
      layout: "hero"
    },
    {
      id: 5,
      title: "Art & Culture Night",
      initiativeName: "Creative Hub",
      initiativeImage: "/images/image.png",
      isFavorite: false,
      date: "25.05.2026",
      description: "An evening celebrating local artists and performers.",
      banner: "/images/image.png",
      layout: "compact"
    },
    {
      id: 6,
      title: "Startup Pitch Day",
      initiativeName: "Innovation Lab",
      initiativeImage: "/images/image.png",
      isFavorite: false,
      date: "28.05.2026",
      description: "Startups present their ideas to investors and mentors.",
      banner: "/images/image.png",
      layout: "split"
    },

    /* ---- duplicates kept as-is but now structured ---- */

    {
      id: 7,
      title: "Event Title 1",
      initiativeName: "Initiative A",
      initiativeImage: "/images/image.png",
      isFavorite: true,
      date: "18.05.2026",
      description: "Description 1",
      banner: "/images/image.png",
      layout: "compact"
    },
    {
      id: 8,
      title: "Event Title 2",
      initiativeName: "Initiative B",
      initiativeImage: "/images/image.png",
      isFavorite: false,
      date: "19.05.2026",
      description: "Description 2",
      banner: "/images/image.png",
      layout: "split"
    },
    {
      id: 9,
      title: "Green Future Workshop",
      initiativeName: "Eco Initiative",
      initiativeImage: "/images/image.png",
      isFavorite: false,
      date: "20.05.2026",
      description: "A workshop focused on sustainability and climate action.",
      banner: "/images/image.png",
      layout: "hero"
    },
    {
      id: 10,
      title: "Tech Meetup Berlin",
      initiativeName: "Dev Community",
      initiativeImage: "/images/image.png",
      isFavorite: true,
      date: "22.05.2026",
      description: "Networking event for developers and tech enthusiasts.",
      banner: "/images/image.png",
      layout: "compact"
    },
    {
      id: 11,
      title: "Art & Culture Night",
      initiativeName: "Creative Hub",
      initiativeImage: "/images/image.png",
      isFavorite: false,
      date: "25.05.2026",
      description: "An evening celebrating local artists and performers.",
      banner: "/images/image.png",
      layout: "split"
    },
    {
      id: 12,
      title: "Startup Pitch Day",
      initiativeName: "Innovation Lab",
      initiativeImage: "/images/image.png",
      isFavorite: false,
      date: "28.05.2026",
      description: "Startups present their ideas to investors and mentors.",
      banner: "/images/image.png",
      layout: "hero"
    },

    /* final card */
    {
      id: 13,
      title: "LAST CARD",
      initiativeName: "Innovation Lab",
      initiativeImage: "/images/image.png",
      isFavorite: false,
      date: "28.05.2026",
      description: "Startups present their ideas to investors and mentors.",
      banner: "/images/image.png",
      layout: "compact"
    },
  ];

    setEvents(fetchedEvents);
    }, []);

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

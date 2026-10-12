import { useState } from 'react'
import './App.css'
import EventCard from "./components/EventCard"

function App() {
  return(
    <>
      <EventCard event={{
        title: "Event Title", 
        initiativeName: "Initiative", 
        initiativeImage: "/images/image.png", 
        isFavorite: true, date: "18.05.2026", 
        description: "This event has a description",
        banner: "/images/image.png", 
      }}/>

      <EventCard event={{
        title: "Event Title", 
        initiativeName: "Initiative", 
        initiativeImage: "/images/image.png", 
        isFavorite: true, date: "18.05.2026", 
        description: "This event has a description",
        banner: "/images/image.png", 
      }}/>
    </>
  )
}


export default App

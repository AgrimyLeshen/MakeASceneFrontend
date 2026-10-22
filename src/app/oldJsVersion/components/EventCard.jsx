import EventCardHeader from "./EventCardHeader";
import LayoutRegistry from "./layoutRegistry";
import "../css/EventCard.css";

function EventCard({ event }) {
  const Layout = LayoutRegistry[event.layout] || LayoutRegistry.compact;

  return (
    <div className={`event-card event-card--${event.layout || "compact"}`}>
        <EventCardHeader event={event} />

        <div className="event-body-wrapper">
        <Layout event={event} />
      </div>
    </div>
  );
}

export default EventCard;
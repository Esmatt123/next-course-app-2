export async function getAllEvents() {
    const response = await fetch('https://nextjs-fb-db-default-rtdb.europe-west1.firebasedatabase.app/.json')
    const data = await response.json();
    const data2 = data.events
    const events = []

    for (const key in data2) {
        events.push({
            id: key,
            ...data2[key]
        })
    }

    

    return events;
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
    const allEvents = await getAllEvents()
    return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;

    const allEvents = await getAllEvents()
  
    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }


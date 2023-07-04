// Event class
class Event {
  constructor(name, date, time, location, category, tickets, imageSrc) {
    this.name = name;
    this.date = new Date(date);
    this.time = time;
    this.location = location;
    this.category = category;
    this.tickets = tickets;
    this.imageSrc = imageSrc;
  }

  render() {
    // Create a div element with the class 'event-card'
    const eventCard = document.createElement("div");
    eventCard.className = "event-card";

    const imageElement = document.createElement("img");
    imageElement.src = this.imageSrc;
    eventCard.appendChild(imageElement);

    const nameElement = document.createElement("h2");
    nameElement.textContent = this.name;
    eventCard.appendChild(nameElement);

    // Create a paragraph element for the date and set its text content
    // format date using `this.date.toDateString()`

    const dateElement = document.createElement("p");
    dateElement.textContent = `Date: ${this.date.toDateString()}`;
    eventCard.appendChild(dateElement);

    const timeElement = document.createElement("p");
    timeElement.textContent = `Time: ${this.time}`;
    eventCard.appendChild(timeElement);

    const locationElement = document.createElement("p");
    locationElement.textContent = `Location: ${this.location}`;
    eventCard.appendChild(locationElement);

    const categoryElement = document.createElement("p");
    categoryElement.textContent = `Category: ${this.category}`;
    eventCard.appendChild(categoryElement);

    const ticketsElement = document.createElement("p");
    ticketsElement.textContent = `Tickets availabe: ${this.tickets}`;
    eventCard.appendChild(ticketsElement);

    const priceElement = document.createElement("p");
    priceElement.textContent = `Price: $${this.price}`;
    eventCard.appendChild(priceElement);

    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Buy Tickets";

    // Check if the event has already passed
    const currentDate = new Date();
    if (this.date < currentDate) {
      buttonElement.disabled = true; // Disable the button if the event has passed
      buttonElement.textContent = "Passed"; // Update the button text
    }

    // Add event listener to the button
    buttonElement.addEventListener("click", () => {
      // Store the event details in localStorage
      localStorage.setItem("selectedTicket", JSON.stringify(this));
      // Redirect to the ticket.html page
      window.location.href = "ticket.html";
      console.log("Button clicked!");
    });

    // Add the button to the event card
    eventCard.appendChild(buttonElement);

    // Return the event card element
    return eventCard;
  }
}

// Extend class event to add price
class Ticket extends Event {
  constructor(name, date, time, location, category, tickets, imageSrc, price) {
    super(name, date, time, location, category, tickets, imageSrc);
    this.price = price;
  }
}

// Create some events instances
const events = [
  new Ticket(
    "BTS Live Concert",
    "2023-08-15",
    "18:00:00",
    "New York, NY",
    "Band",
    1000,
    "https://cdn.wallpapersafari.com/97/94/8kOXIG.jpg",
    118
  ),
  new Ticket(
    "Coldplay Live Concert",
    "2023-07-30",
    "20:30:00",
    "Madison Square Garden, New York, NY",
    "Band",
    1000,
    "https://i.scdn.co/image/ab6761610000e5eb989ed05e1f0570cc4726c2d3",
    75
  ),
  new Ticket(
    "Taylor Swift World Tour",
    "2023-09-12",
    "20:00:00",
    "Los Angeles, CA",
    "Solo Artist",
    2000,
    "https://www.billboard.com/wp-content/uploads/2023/06/taylor-swift-live-may-2023-b-r-billboard-1548.jpg?w=942&h=623&crop=1",
    86
  ),
  new Ticket(
    "Ed Sheeran in Concert",
    "2023-10-05",
    "18:30:00",
    "London, UK",
    "Solo Artist",
    1200,
    "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2023/05/08/16835686875455.jpg",
    0
  ),
  new Ticket(
    "Beyoncé Formation Tour",
    "2023-02-09",
    "19:00:00",
    "Houston, TX",
    "Solo Artist",
    1800,
    "https://hips.hearstapps.com/digitalspyuk.cdnds.net/16/32/1471002537-gettyimages-453482991.jpg?resize=1200:*",
    150
  ),
  new Ticket(
    "Imagine Dragons Live Show",
    "2023-02-02",
    "21:00:00",
    "Las Vegas, NV",
    "Band",
    1000,
    "https://www.thesouthafrican.com/wp-content/uploads/2022/06/Imagine-Dragons.jpg",
    0
  ),
  new Ticket(
    "Bruno Mars World Tour",
    "2023-01-15",
    "20:30:00",
    "Miami, FL",
    "Solo Artist",
    1500,
    "https://www.asiaone.com/sites/default/files/original_images/May2023/0523_BRUNO%20MARS_MAIN.jpg",
    80
  ),
  new Ticket(
    "Maroon 5 Concert",
    "2023-01-10",
    "19:00:00",
    "San Francisco, CA",
    "Band",
    1800,
    "https://famuse.co/wp-content/uploads/2022/01/When-did-Maroon-5-disband.jpg",
    0
  ),
  new Ticket(
    "Chris Brown Live",
    "2023-07-10",
    "19:00:00",
    "Las Angeles, CA",
    "Solo Artist",
    2000,
    "https://www.rap-up.com/wp-content/uploads/2022/04/chris-brown-hat-7.jpg",
    107
  ),
];

// Function to render the events
function renderEvents(
  eventsToRender,
  categoryFilter = "all",
  dateFilter = "all"
) {
  const eventListElement = document.getElementById("event-list");
  eventListElement.innerHTML = "";

  // Sort the events by date in ascending order
  eventsToRender.sort((a, b) => a.date.getTime() - b.date.getTime());

  const currentDate = new Date();

  eventsToRender.forEach((event) => {
    // Apply category filter if it is not set to 'all'
    if (categoryFilter === "all" || event.category === categoryFilter) {
      // Apply date filter based on user selection
      if (dateFilter === "upcoming" && event.date >= currentDate) {
        const eventCard = event.render();
        eventListElement.appendChild(eventCard);
      } else if (dateFilter === "passed" && event.date < currentDate) {
        const eventCard = event.render();
        eventListElement.appendChild(eventCard);
      } else if (dateFilter === "all") {
        const eventCard = event.render();
        eventListElement.appendChild(eventCard);
      }
    }
  });
}

// Function to handle search event
function handleSearch() {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.toLowerCase();

  const categoryFilter = document.getElementById("category-filter").value;
  const dateFilter = document.getElementById("date-filter").value;

  const filteredEvents = events.filter((event) => {
    const eventName = event.name.toLowerCase();
    return eventName.includes(searchTerm);
  });

  renderEvents(filteredEvents, categoryFilter, dateFilter);
}

// Event listener for search input
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", handleSearch);

// Event listener for category filter
const categoryFilter = document.getElementById("category-filter");
categoryFilter.addEventListener("change", handleSearch);

// Event listener for date filter
const dateFilter = document.getElementById("date-filter");
dateFilter.addEventListener("change", handleSearch);

// Call the handleSearch function initially to display all events
handleSearch();

// Call the renderEvents function to display the events initially
renderEvents(events);

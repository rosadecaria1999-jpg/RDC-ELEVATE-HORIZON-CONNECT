// seed.js
require("dotenv").config();
const sequelize = require("./database");
const { Event, Registration } = require("./models");

async function seed() {
  try {
    console.log("Seeding database...");

    // Reset database
    await sequelize.sync({ force: true });

    const eventsData = [
      {
        title: "Sunrise Yoga at Bondi",
        date: "2026-05-03",
        startTime: "06:30",
        endTime: "07:30",
        location: "Bondi Beach",
        category: "Fitness",
        description: "Morning yoga overlooking Bondi Beach.",
        capacity: 30,
      },
      {
        title: "Parramatta Tech Meetup",
        date: "2026-05-07",
        startTime: "18:00",
        endTime: "20:00",
        location: "Parramatta Library",
        category: "Technology",
        description: "Networking and tech talks for developers.",
        capacity: 80,
      },
      {
        title: "Newtown Indie Music Night",
        date: "2026-05-12",
        startTime: "19:00",
        endTime: "22:00",
        location: "Newtown Arts Hub",
        category: "Music",
        description: "Live performances from local indie bands.",
        capacity: 120,
      },
      {
        title: "Chatswood Food Festival",
        date: "2026-05-16",
        startTime: "11:00",
        endTime: "16:00",
        location: "Chatswood Mall",
        category: "Food",
        description: "Street food, desserts, and cultural cuisine.",
        capacity: 250,
      },
      {
        title: "Manly Beach Bootcamp",
        date: "2026-05-22",
        startTime: "07:00",
        endTime: "08:00",
        location: "Manly Beach",
        category: "Fitness",
        description: "Outdoor beach fitness session.",
        capacity: 40,
      },
      {
        title: "Marrickville Makers Market",
        date: "2026-06-05",
        startTime: "10:00",
        endTime: "15:00",
        location: "Marrickville Community Hall",
        category: "Arts",
        description: "Handmade crafts and local artisan products.",
        capacity: 180,
      },
      {
        title: "Ryde Coding Workshop",
        date: "2026-06-11",
        startTime: "17:30",
        endTime: "20:00",
        location: "Ryde Community Centre",
        category: "Education",
        description: "Introduction to JavaScript and APIs.",
        capacity: 35,
      },
      {
        title: "Cronulla Coastal Walk",
        date: "2026-06-18",
        startTime: "08:00",
        endTime: "10:00",
        location: "Cronulla Esplanade",
        category: "Outdoor",
        description: "Guided community coastal walking group.",
        capacity: 50,
      },
      {
        title: "Liverpool Community BBQ",
        date: "2026-06-26",
        startTime: "12:00",
        endTime: "15:00",
        location: "Bigge Park Liverpool",
        category: "Community",
        description: "Family BBQ and outdoor games.",
        capacity: 200,
      },
      {
        title: "Blacktown Basketball Clinic",
        date: "2026-07-04",
        startTime: "09:00",
        endTime: "12:00",
        location: "Blacktown Sports Centre",
        category: "Fitness",
        description: "Basketball skills clinic for teens.",
        capacity: 60,
      },
      {
        title: "Penrith Outdoor Cinema",
        date: "2026-07-10",
        startTime: "18:30",
        endTime: "21:00",
        location: "Penrith Lakes",
        category: "Entertainment",
        description: "Outdoor family movie night.",
        capacity: 300,
      },
      {
        title: "Surry Hills Startup Networking",
        date: "2026-07-17",
        startTime: "18:00",
        endTime: "21:00",
        location: "Surry Hills Innovation Hub",
        category: "Networking",
        description: "Meet startups, designers, and developers.",
        capacity: 100,
      },
      {
        title: "Burwood Family Fun Day",
        date: "2026-07-25",
        startTime: "10:00",
        endTime: "16:00",
        location: "Burwood Park",
        category: "Community",
        description: "Games, food trucks, and live music.",
        capacity: 250,
      },
      {
        title: "Hornsby Nature Photography Walk",
        date: "2026-08-02",
        startTime: "08:00",
        endTime: "11:00",
        location: "Hornsby National Park",
        category: "Arts",
        description: "Photography tips while exploring nature.",
        capacity: 25,
      },
      {
        title: "Campbelltown Wellness Expo",
        date: "2026-08-14",
        startTime: "09:00",
        endTime: "15:00",
        location: "Campbelltown Civic Hall",
        category: "Health",
        description: "Health services and wellbeing workshops.",
        capacity: 220,
      },
      {
        title: "Bondi Sunset Meditation",
        date: "2026-08-21",
        startTime: "17:30",
        endTime: "18:30",
        location: "Bondi Pavilion",
        category: "Health",
        description: "Guided meditation session by the beach.",
        capacity: 35,
      },
      {
        title: "Parramatta Business Breakfast",
        date: "2026-09-03",
        startTime: "07:30",
        endTime: "09:00",
        location: "Parramatta Square",
        category: "Networking",
        description: "Professional networking breakfast.",
        capacity: 70,
      },
      {
        title: "Chatswood Coding for Kids",
        date: "2026-09-12",
        startTime: "10:00",
        endTime: "13:00",
        location: "Chatswood Library",
        category: "Technology",
        description: "Fun beginner coding activities for children.",
        capacity: 30,
      },
      {
        title: "Newtown Street Art Tour",
        date: "2026-09-18",
        startTime: "14:00",
        endTime: "16:00",
        location: "King Street Newtown",
        category: "Arts",
        description: "Explore famous murals and street art.",
        capacity: 40,
      },
      {
        title: "Manly Surf Safety Workshop",
        date: "2026-09-27",
        startTime: "09:00",
        endTime: "11:00",
        location: "Manly Surf Club",
        category: "Education",
        description: "Learn beach and surf safety basics.",
        capacity: 45,
      },
      {
        title: "Ryde Robotics Expo",
        date: "2026-10-08",
        startTime: "10:00",
        endTime: "16:00",
        location: "Ryde TAFE",
        category: "Technology",
        description: "Student robotics projects and demos.",
        capacity: 150,
      },
      {
        title: "Cronulla Community Fun Run",
        date: "2026-10-17",
        startTime: "07:00",
        endTime: "10:00",
        location: "Cronulla Beachfront",
        category: "Fitness",
        description: "5km and 10km community fun run.",
        capacity: 300,
      },
      {
        title: "Liverpool Careers Expo",
        date: "2026-10-24",
        startTime: "10:00",
        endTime: "15:00",
        location: "Liverpool Convention Centre",
        category: "Education",
        description: "Employers, universities, and workshops.",
        capacity: 250,
      },
      {
        title: "Blacktown Outdoor Market",
        date: "2026-11-01",
        startTime: "09:00",
        endTime: "14:00",
        location: "Blacktown Showground",
        category: "Community",
        description: "Fresh produce and local businesses.",
        capacity: 200,
      },
      {
        title: "Penrith Kayaking Day",
        date: "2026-11-12",
        startTime: "08:00",
        endTime: "12:00",
        location: "Nepean River",
        category: "Outdoor",
        description: "Kayaking activities for beginners.",
        capacity: 35,
      },
      {
        title: "Surry Hills Design Workshop",
        date: "2026-11-20",
        startTime: "18:00",
        endTime: "20:30",
        location: "Creative Studios Surry Hills",
        category: "Arts",
        description: "UI and graphic design fundamentals.",
        capacity: 45,
      },
      {
        title: "Burwood Night Market",
        date: "2026-11-28",
        startTime: "17:00",
        endTime: "22:00",
        location: "Burwood Chinatown",
        category: "Food",
        description: "Asian street food and entertainment.",
        capacity: 300,
      },
      {
        title: "Hornsby Christmas Concert",
        date: "2026-12-05",
        startTime: "18:30",
        endTime: "21:00",
        location: "Hornsby Park",
        category: "Music",
        description: "Community Christmas music event.",
        capacity: 400,
      },
      {
        title: "Campbelltown Summer Fitness Camp",
        date: "2026-12-12",
        startTime: "07:00",
        endTime: "09:00",
        location: "Campbelltown Sports Ground",
        category: "Fitness",
        description: "Outdoor summer group training.",
        capacity: 60,
      },
      {
        title: "Bondi End of Year Beach Party",
        date: "2026-12-28",
        startTime: "17:00",
        endTime: "23:00",
        location: "Bondi Beach",
        category: "Community",
        description: "Celebrate the end of the year by the beach.",
        capacity: 500,
      },
    ];

    // Create events
    for (const e of eventsData) {
      const ev = await Event.create({
        title: e.title,
        date: e.date,
        startTime: e.startTime,
        endTime: e.endTime,
        location: e.location,
        category: e.category,
        description: e.description,
        capacity: e.capacity,
        spotsRemaining: e.capacity,
        isCancelled: false,
      });

      console.log(`Created event: ${ev.title}`);
    }

    // Sample registrations
    const sampleRegistrations = [
      {
        eventTitle: "Sunrise Yoga at Bondi",
        fullName: "Emily Carter",
        email: "emily@example.com",
      },
      {
        eventTitle: "Parramatta Tech Meetup",
        fullName: "James Wilson",
        email: "james@example.com",
      },
      {
        eventTitle: "Chatswood Food Festival",
        fullName: "Sophia Nguyen",
        email: "sophia@example.com",
      },
      {
        eventTitle: "Surry Hills Startup Networking",
        fullName: "Liam Brown",
        email: "liam@example.com",
      },
      {
        eventTitle: "Burwood Night Market",
        fullName: "Olivia Taylor",
        email: "olivia@example.com",
      },
    ];

    for (const r of sampleRegistrations) {
      const ev = await Event.findOne({
        where: { title: r.eventTitle },
      });

      if (!ev) continue;

      const reg = await Registration.create({
        eventId: ev.id,
        fullName: r.fullName,
        email: r.email,
      });

      ev.spotsRemaining -= 1;
      await ev.save();

      console.log(`Registered ${reg.fullName} to ${ev.title}`);
    }

    console.log("Seeding complete.");
    process.exit(0);

  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
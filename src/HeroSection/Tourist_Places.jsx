
import React, { useRef, useState } from "react";
import NavigationButtons from "../components/NavigationButtons";
const touristPlacesData = [
  // 🏞️ Natural Attractions
  {
    id: 1,
    category: "Natural Attractions",
    subcategory: "Mountains",
    name: "Swiss Alps",
    location: "Switzerland",
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2",
    description: "Snow-covered peaks and valleys ideal for skiing and relaxation."
  },
  {
    id: 2,
    category: "Natural Attractions",
    subcategory: "Waterfalls",
    name: "Niagara Falls",
    location: "Canada/USA",
    image: "https://images.unsplash.com/photo-1532274402917-5aadf881bdfd",
    description: "Majestic waterfall straddling two nations, a sight to behold."
  },
  {
    id: 3,
    category: "Natural Attractions",
    subcategory: "Beaches",
    name: "Bondi Beach",
    location: "Australia",
    image: "https://images.unsplash.com/photo-1589561253898-768105ca91a7",
    description: "Surf waves, sunshine, and beachside cafes — a surfer's paradise."
  },

  // 🏛️ Historical & Cultural
  {
    id: 4,
    category: "Historical & Cultural",
    subcategory: "Ancient Wonders",
    name: "Taj Mahal",
    location: "India",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
    description: "Symbol of love and Mughal architecture in white marble."
  },
  {
    id: 5,
    category: "Historical & Cultural",
    subcategory: "Heritage Towns",
    name: "Kyoto",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1526481280690-7c88f39a46b2",
    description: "Temples, tea houses, and centuries of preserved Japanese culture."
  },

  // 🌆 Urban & Modern Cities
  {
    id: 6,
    category: "Urban & Modern Cities",
    subcategory: "High-Tech",
    name: "Tokyo",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",
    description: "Blend of tradition and tech — neon lights, temples, and anime vibes."
  },
  {
    id: 7,
    category: "Urban & Modern Cities",
    subcategory: "Luxury Lifestyle",
    name: "Dubai",
    location: "UAE",
    image: "https://images.unsplash.com/photo-1600607687920-4ec1e1d122b1",
    description: "Skyscrapers, desert safaris, shopping festivals, and gold souks."
  },

  // 🎢 Theme Parks
  {
    id: 8,
    category: "Theme Parks",
    subcategory: "Fantasy",
    name: "Disneyland",
    location: "USA",
    image: "https://images.unsplash.com/photo-1594583774207-ec49b7e3b3c6",
    description: "Where fairy tales come alive — rides, shows, and magic!"
  },
  {
    id: 9,
    category: "Theme Parks",
    subcategory: "Adventure",
    name: "Universal Studios",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1587812445193-18b9271c6a1c",
    description: "Movies, rollercoasters, and 3D action-packed fun for all ages."
  },

  // 🧘 Wellness & Spiritual
  {
    id: 10,
    category: "Wellness & Spiritual",
    subcategory: "Yoga & Meditation",
    name: "Rishikesh",
    location: "India",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195dd2",
    description: "Peaceful town by the Ganges offering global yoga experiences."
  },
  {
    id: 11,
    category: "Wellness & Spiritual",
    subcategory: "Healing Retreats",
    name: "Ubud Retreats",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1587825140708-8e5c13dcfb7b",
    description: "Lush jungle hideouts offering healing, spa, and spirituality."
  },

  // 🧗 Adventure & Sports
  {
    id: 12,
    category: "Adventure & Sports",
    subcategory: "Skydiving",
    name: "Dubai SkyDive",
    location: "UAE",
    image: "https://images.unsplash.com/photo-1508610048659-a06f1c692fa7",
    description: "Skydive over Palm Jumeirah for an adrenaline-pumping view."
  },
  {
    id: 13,
    category: "Adventure & Sports",
    subcategory: "Scuba Diving",
    name: "Great Barrier Reef",
    location: "Australia",
    image: "https://images.unsplash.com/photo-1544551763-cc0328b2b2c3",
    description: "Colorful corals, sea turtles, and undersea magic await here."
  },

  // 🍜 Culinary
  {
    id: 14,
    category: "Culinary",
    subcategory: "Street Food",
    name: "Bangkok Street Food",
    location: "Thailand",
    image: "https://images.unsplash.com/photo-1600891963935-77aaad71f421",
    description: "Affordable, spicy, and flavorful food sold at night markets."
  },
  {
    id: 15,
    category: "Culinary",
    subcategory: "Wine & Dine",
    name: "Tuscany Wine Trail",
    location: "Italy",
    image: "https://images.unsplash.com/photo-1551524187-7d1b3fcb3134",
    description: "Rolling vineyards, fine wines, and traditional Italian meals."
  },

  // 🏔️ Offbeat & Remote
  {
    id: 16,
    category: "Offbeat & Remote",
    subcategory: "Highland Escapes",
    name: "Faroe Islands",
    location: "Denmark",
    image: "https://images.unsplash.com/photo-1549887534-68c8c2b05092",
    description: "Dramatic cliffs, sheep-dotted hills, and total isolation."
  },
  {
    id: 17,
    category: "Offbeat & Remote",
    subcategory: "Valley Trails",
    name: "Spiti Valley",
    location: "India",
    image: "https://images.unsplash.com/photo-1600234165730-19463ed2e34f",
    description: "Rugged, untouched Himalayan desert with monasteries and beauty."
  }
]
;

const categories = [
  "All",
  "Natural Attractions",
  "Historical & Cultural",
  "Urban & Modern Cities",
  "Theme Parks",
  "Wellness & Spiritual",
  "Adventure & Sports",
  "Culinary",
  "Offbeat & Remote",
];

const TouristAndPlace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const contentRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredPlaces =
    selectedCategory === "All"
      ? touristPlacesData
      : touristPlacesData.filter(
          (place) => place.category === selectedCategory
        );

  return (
    <div className="container py-5">
      <NavigationButtons />

      {/* Explore Button */}
      <div className="text-center mb-4">
        <button
          onClick={scrollToContent}
          className="btn btn-primary px-4 py-2 fs-5 fw-bold rounded-pill"
        >
          🌍 Explore Tourist Moments
        </button>
      </div>

      {/* Intro Section */}
      <h1 className="display-5 fw-bold text-center mt-5">
        Discover the World Beyond Booking
      </h1>
      <p className="lead text-center text-muted px-3">
        Not every journey needs a reservation—some are meant to be felt.
      </p>
      <p className="text-center text-primary fw-semibold">
        Travel not to escape life, but so life doesn't escape you.
      </p>

      {/* Category Buttons */}
      <div className="d-flex flex-wrap justify-content-center gap-2 my-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn ${
              selectedCategory === cat ? "btn-dark" : "btn-outline-secondary"
            } rounded-pill px-3`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card Grid */}
      <div ref={contentRef} className="row g-4">
        {filteredPlaces.map((place) => (
          <div className="col-md-6 col-lg-4" key={place.id}>
            <div className="card h-100 shadow-sm border-0">
              <img
                src={place.image}
                alt={place.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">{place.name}</h5>
                <h6 className="text-muted mb-2">{place.location}</h6>
                <p className="card-text text-secondary">{place.description}</p>
              </div>
              <div className="card-footer bg-transparent border-0">
                <button className="btn btn-outline-primary w-100 rounded-pill">
                  ✈️ Know More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TouristAndPlace;

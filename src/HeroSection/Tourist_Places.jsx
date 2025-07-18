import React, { useRef } from "react";

const TouristAndPlace = () => {
    const contentRef = useRef(null);

    const scrollToContent = () => {
        contentRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="container py-5">
            {/* Top Button */}
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
                Not every journey needs a reservation—some are meant to be felt. Explore breathtaking destinations, hidden gems, and soulful places that don't need a price tag, just your presence.
            </p>
            <p className="text-center text-primary fw-semibold">
                Travel not to escape life, but so life doesn't escape you.
            </p>

            {/* Category Content */}
            <div ref={contentRef} className="mt-5">
                <h2 className="text-center mb-4">🌄 Popular Categories of Tourist Places</h2>
                <div className="row row-cols-1 row-cols-md-2 g-4">

                    {/* Nature & Scenic Beauty */}
                    <div className="col">
                        <div className="p-3 border rounded shadow-sm bg-light">
                            <h4>🏞️ Nature & Scenic Beauty</h4>
                            <ul>
                                <li>Hill Stations – Shimla, Manali, Darjeeling</li>
                                <li>Beaches – Goa, Andaman, Gokarna</li>
                                <li>Valleys – Spiti, Zanskar, Yumthang</li>
                                <li>Lakes – Dal, Pangong, Naini Lake</li>
                                <li>Waterfalls – Dudhsagar, Jog, Athirapally</li>
                            </ul>
                        </div>
                    </div>

                    {/* Historical & Cultural Sites */}
                    <div className="col">
                        <div className="p-3 border rounded shadow-sm bg-light">
                            <h4>🏛️ Historical & Cultural Sites</h4>
                            <ul>
                                <li>Forts & Palaces – Rajasthan, Mysore Palace</li>
                                <li>Temples – Khajuraho, Kashi Vishwanath</li>
                                <li>Monasteries – Tawang, Hemis</li>
                                <li>Museums – Indian, Rail Museum</li>
                                <li>Ancient Ruins – Hampi, Nalanda</li>
                            </ul>
                        </div>
                    </div>

                    {/* Urban & City Life */}
                    <div className="col">
                        <div className="p-3 border rounded shadow-sm bg-light">
                            <h4>🌆 Urban & City Life</h4>
                            <ul>
                                <li>Iconic Cityscapes – Mumbai, Delhi, Bangalore</li>
                                <li>Street Markets – Sarojini, Colaba</li>
                                <li>Theme Parks – Imagica, Ramoji Film City</li>
                                <li>Food Streets – Chandni Chowk, Sarafa</li>
                            </ul>
                        </div>
                    </div>

                    {/* Adventure & Exploration */}
                    <div className="col">
                        <div className="p-3 border rounded shadow-sm bg-light">
                            <h4>🌿 Adventure & Exploration</h4>
                            <ul>
                                <li>Trekking – Kedarkantha, Triund</li>
                                <li>Desert Safari – Jaisalmer, Bikaner</li>
                                <li>Wildlife – Jim Corbett, Ranthambore</li>
                                <li>Caving – Meghalaya caves</li>
                                <li>Rafting – Rishikesh</li>
                            </ul>
                        </div>
                    </div>

                    {/* Spiritual & Wellness */}
                    <div className="col">
                        <div className="p-3 border rounded shadow-sm bg-light">
                            <h4>🧘 Spiritual & Wellness</h4>
                            <ul>
                                <li>Yoga – Rishikesh, Kerala</li>
                                <li>Ashrams – Auroville, Isha Foundation</li>
                                <li>Meditation Centers, Hot Springs</li>
                            </ul>
                        </div>
                    </div>

                    {/* Offbeat & Hidden Gems */}
                    <div className="col">
                        <div className="p-3 border rounded shadow-sm bg-light">
                            <h4>🌍 Offbeat & Hidden Gems</h4>
                            <ul>
                                <li>Ziro Valley – Arunachal Pradesh</li>
                                <li>Majuli Island – Assam</li>
                                <li>Gokarna – Karnataka</li>
                                <li>Chopta – Uttarakhand</li>
                                <li>Dzukou Valley – Nagaland</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TouristAndPlace;

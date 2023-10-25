'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";

import NavBar from '@/components/sections/NavBar';
// import HomeBanner from '@/components/sections/HomeBanner';
import CarGridShow from '@/components/sections/CarGridShow';
// import SearchBox2 from '@/components/items/SearchBox2';
// import FeaturedCars from '@/components/sections/FeaturedCars';
// import UniqueHost1 from '@/components/sections/UniqueHost1';
// import PlanTrip from '@/components/items/PlanTrip';
// import ExploreWithoutLimits1 from '@/components/sections/ExploreWithoutLimits1';
// import HaveQuestion from '@/components/sections/HaveQuestion';
// import ExploreWithoutLimits2 from '@/components/sections/ExploreWithoutLimits2';
// import CommonQuestions from '@/components/sections/CommonQuestions';
import Footer from '@/components/sections/Footer';

const DATA = [{key: 1, name: "Rent a car"}, {key: 2, name: "By destination"}, {key: 3, name: "Lagos"}];

const Page = () => {

    return (
        <div>
            <NavBar bgColor="#FFF" />
            <div className="my-20"></div>

            <CarGridShow />
            <div className="my-20"></div>
            <Footer />
            <div className="my-20"></div>
        </div>
    );
};

export default Page;
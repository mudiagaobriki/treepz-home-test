'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";

// Custom components
import Button1 from '@/components/items/Button1';

const DATA = [
    {
        key: 1,
        image: "/assets/images/caravan-fill.png",
        title: 'Bluetooth',
    },
    {
        key: 2,
        image: "/assets/images/caravan-fill.png",
        title: "Air conditioner",
    },
    {
        key: 3,
        image: "/assets/images/caravan-fill.png",
        title: "USB charger",
    },
    {
        key: 4,
        image: "/assets/images/caravan-fill.png",
        title: 'Automatic gear system',
    },
    {
        key: 5,
        image: "/assets/images/caravan-fill.png",
        title: "Air conditioner",
    },
    {
        key: 6,
        image: "/assets/images/caravan-fill.png",
        title: "USB charger",
    },
]

const VehicleFeatures = () => {

    // let mobPad = isMobile ? "px-5 py-2" : "px-20 py-3";

    return (
        <div className="w-2/3 pt-8 tz-border-top-3">
            <h3 className="text-2xl font-medium tz-text-dark mb-5">Features</h3>
            <div className="grid grid-cols-2 gap-y-5 mb-5">
                {
                    DATA.map((item, index) => {
                        return <div key={item?.key}>
                                <div className="flex items-center gap-3">
                                    <Image src={item?.image} alt="caravan icon" width={28} height={28} />
                                    <span className="tz-text-dark">{item?.title}</span>
                                </div>
                            </div>
                    })
                }
            </div>
            <div className="flex items-center justify-end gap-2 w-full">
                <p className="text-base font-semibold tz-text-dark">Show less</p>
                <Image src="/assets/images/chevron-up-line.png" alt="" width={24} height={24} className="flex-shrink-0" />
            </div>
        </div>
    );
};

export default VehicleFeatures;

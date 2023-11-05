'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";

import AccountNavBar from '@/components/accounts/AccountNavBar';
import AccountSideBar from '@/components/accounts/AccountSideBar';
import Referals from '@/components/accounts/Referals';

const Page = () => {

    return (
        <div className="">
            <AccountNavBar active={"profile"} />
            <div className="my-16"></div>
            <div className="px-32 flex items-start gap-14">
                <AccountSideBar page={"referals"} />
                <Referals />
            </div>
            <div className="my-48"></div>
        </div>
    );
};

export default Page;

'use client';

import React, {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

// Third party components
import { Modal } from 'flowbite';

import NavBar from '@/components/sections/NavBar';
import VehicleType from '@/components/sections/VehicleType';
import BookingDetails from '@/components/sections/BookingDetails';
import MapSection from '@/components/sections/MapSection';
import LocationSection from '@/components/sections/LocationSection';
import BreadCrumb from '@/components/items/BreadCrumb';
import Footer from '@/components/sections/Footer';
import Signup from '@/components/modals/Signup';
import Login from '@/components/modals/Login';
import ForgotPassword from '@/components/modals/ForgotPassword';
import NewPassword from '@/components/modals/NewPassword';
import EmailOTP from '@/components/modals/EmailOTP';
import SuccessCard from '@/components/modals/SuccessCard';
import {useDispatch, useSelector} from "react-redux";
import Button1 from "../../components/items/Button1";
import {BASE_URL} from "../../public/assets/constants/constants";
import axios from "axios";
import {setCurrentUser} from "../../redux/features/authSlice";
import VehicleImage from "../../components/sections/VehicleImage";
import ReviewReservation from "../../components/modals/ReviewReservation";

const Page = () => {
        const [userLocation, setUserLocation] = useState(null)
        const [showLoginModal, setShowLoginModal] = useState(false)
        const [showSignupModal, setShowSignupModal] = useState(false)
        const [showForgotModal, setShowForgotModal] = useState(false)
        const [showOTPModal, setShowOTPModal] = useState(false)
        const [showResetModal, setShowResetModal] = useState(false)
        const [showSuccessCard, setShowSuccessCard] = useState(false)
        const [carImages, setCarImages] = useState([])
        const [hasReservationError, setHasReservationError] = useState(false)
        const [priceCalculated, setPriceCalculated] = useState("")
        const [priceCalculatedLocal, setPriceCalculatedLocal] = useState("")
        const [priceShown, setPriceShown] = useState(false)
        const [bookingId, setBookingId] = useState("")
        const [showReviewReservation, setShowReviewReservation] = useState(false)

        const dispatch = useDispatch()
        const router = useRouter();

        const selectedRide = useSelector(state => state.marketplace.selectedRide)
        const {currentUser, token} = useSelector(state => state.auth);
        console.log({currentUser, token})
        console.log({selectedRide})
        const vehicleName = selectedRide?.vehicle?.vehicleMake?.name + " " + selectedRide?.vehicle?.vehicleModel?.name
        const vehicleYear = selectedRide?.vehicle?.vehicleYear

        const bookingRef = useRef(null)

        useEffect(() => {
                setCarImages(selectedRide?.vehicle?.vehicleImages)
        },[selectedRide])

        // get user location
        useEffect(() => {
                if ("geolocation" in navigator) {
                        console.log("Location Available");
                        navigator.geolocation.getCurrentPosition(function(position) {
                                console.log("Latitude is :", position.coords.latitude);
                                console.log("Longitude is :", position.coords.longitude);
                        });
                } else {
                        console.log("Location Not Available");
                }
        },[])

        const handleReserveClicked = () => {
                if (!currentUser){
                        setShowLoginModal(true)
                }
                else{
                        setShowLoginModal(true)
                        // alert('Fill the ride details on the reservation form below')
                }
                // alert("Clicked")
        }

        const actualHandleReserveClicked = async (pd,pt,dd,dt,lc) => {
                // console.log({pd,pt,dd,dt,lc})
                await InitiateBooking(pt,dt,lc,selectedRide?.id)
        }

        const onReserveRide = async (pd,pt,dd,dt,lc) => {
                // get date difference
                let diff = new Date(dd) - new Date(pd)
                diff = diff / (1000*3600)

                console.log(diff)
                await InitiateBooking(pd,dd,lc,selectedRide?.vehicle?.id)

        }

        const handleCloseModal = () => {
                setShowLoginModal(false)
        }

        const handleCloseSignupModal = () => {
                setShowSignupModal(false)
        }

        const handleCloseForgotModal = () => {
                setShowForgotModal(false)
        }

        const handleCloseOTPModal = () => {
                setShowOTPModal(false)
        }

        const handleCloseResetModal = () => {
                setShowResetModal(false)
        }

        const handleCloseSuccessCard = () => {
                setShowSuccessCard(false)
                setShowLoginModal(true)
        }

        const handleSignupLinkClicked = () => {
                setShowLoginModal(false)
                setShowSignupModal(true)
        }

        const handleLoginLinkClicked = () => {
                setShowLoginModal(true)
                setShowSignupModal(false)
        }

        const handleForgotLinkClicked = () => {
                setShowLoginModal(false)
                setShowForgotModal(true)
        }

        const handleBackToLogin = () => {
                setShowForgotModal(false)
                setShowSignupModal(false)
                setShowLoginModal(true)
        }

        const handleBackToForgotPassword = () => {
                setShowForgotModal(true)
                setShowOTPModal(false)
        }

        const handleShowEmailOTP = () => {
                setShowForgotModal(false)
                setShowOTPModal(true)
        }

        const handleShowNewPassword = () => {
                setShowOTPModal(false)
                setShowResetModal(true)
        }

        const handleShowNSuccessCard = () => {
                setShowResetModal(false)
                setShowSuccessCard(true)
        }

        const handleCloseReviewReservation = () => {
                setShowReviewReservation(false)
                // setShowSuccessCard(true)
        }

        const InitiateBooking = async (pt,dt,lc, vid) => {
                const credentials = {
                        listedVehicleId: vid,
                        pickUpTime: pt,
                        dropOffTime: dt,
                        rentalType: 'daily',
                        pickUpLocation: lc,
                }

                console.log({credentials})
                // console.log({profileImage: profileImageUrl})
                const url = `${BASE_URL}/order`

                try {
                        const headers = {
                                Authorization: `Bearer ${token?.token}`,
                        }

                        const res = await axios.post(url, credentials, {headers})

                        console.log({res})
                        if (res?.status === 200 || res?.status === 201) {
                                setBookingId(res?.data?.data?.id)
                                await GetPricing(res?.data?.data?.id)
                                // const currentUser = res?.data?.data?.user;
                                // console.log({currentUser})
                                // const token = res?.data?.data?.jwt;
                                // dispatch(setCurrentUser({user: {...currentUser, firstName, lastName, phoneNumber }, loginToken: token}))
                                // setInterval(() => window.location.reload(), 2000)
                                // setShowSuccessModal(true)
                        }
                } catch (ex) {
                        console.log({ex})
                        alert("Invalid credentials. Please try again")
                }
        }

        const GetPricing = async (orderId) => {
                const credentials = {
                        isPreview: true
                }

                console.log({credentials})
                // console.log({profileImage: profileImageUrl})
                const url = `${BASE_URL}/order/${orderId}/payment`

                try {
                        const headers = {
                                Authorization: `Bearer ${token?.token}`,
                        }

                        const res = await axios.patch(url, credentials, {headers})

                        console.log({res})
                        if (res?.status === 200 || res?.status === 201) {
                                setPriceCalculated(res?.data?.data?.amount)
                                console.log("Amount: ", res?.data?.data?.amount)
                                setPriceCalculatedLocal(res?.data?.data?.amountInLocalCurrency)
                                setPriceShown(true)

                                // const currentUser = res?.data?.data?.user;
                                // console.log({currentUser})
                                // const token = res?.data?.data?.jwt;
                                // dispatch(setCurrentUser({user: {...currentUser, firstName, lastName, phoneNumber }, loginToken: token}))
                                // setInterval(() => window.location.reload(), 2000)
                                // setShowSuccessModal(true)
                        }
                } catch (ex) {
                        console.log({ex})
                        // alert("Invalid credentials. Please try again")
                }
        }

        const DirectBooking = async (orderId) => {
                const credentials = {
                        isPreview: true
                }

                console.log({credentials,orderId})
                // console.log({profileImage: profileImageUrl})
                const url = `${BASE_URL}/order/${orderId}/direct`

                try {
                        const headers = {
                                Authorization: `Bearer ${token?.token}`,
                        }

                        const res = await axios.patch(url, credentials, {headers})

                        console.log({res})
                        if (res?.status === 200 || res?.status === 201) {
                                setShowReviewReservation(true)
                                // setPriceCalculated(res?.data?.data?.amount)
                                // console.log("Amount: ", res?.data?.data?.amount)
                                // setPriceCalculatedLocal(res?.data?.data?.amountInLocalCurrency)
                                // setPriceShown(true)
                        }
                } catch (ex) {
                        console.log({ex})
                        setShowReviewReservation(true)
                        // alert("Invalid credentials. Please try again")
                }
        }

        const CheckBooking = async (orderId) => {
                const credentials = {

                }

                console.log({credentials,orderId})
                // console.log({profileImage: profileImageUrl})
                const url = `${BASE_URL}/order/${orderId}`

                try {
                        const headers = {
                                Authorization: `Bearer ${token?.token}`,
                        }

                        const res = await axios.patch(url, credentials, {headers})

                        console.log("Booking status: ",{res})
                        if (res?.status === 200 || res?.status === 201) {
                                setShowReviewReservation(true)
                                // setPriceCalculated(res?.data?.data?.amount)
                                // console.log("Amount: ", res?.data?.data?.amount)
                                // setPriceCalculatedLocal(res?.data?.data?.amountInLocalCurrency)
                                // setPriceShown(true)
                        }
                } catch (ex) {
                        console.log({ex})
                        setShowReviewReservation(true)
                        // alert("Invalid credentials. Please try again")
                }
        }

        const handleBookOrder = async () => {
                await CheckBooking(bookingId)
                await DirectBooking(bookingId)
        }

    return (
        <div>
            <NavBar bgColor="#FFF" />
            <div style={{cursor: 'pointer'}} onClick={() => router.back()} className="px-32 flex items-center gap-2 mt-14 mb-10 font-semibold tz-text-orange-1">
                <Image src="/assets/images/arrow-go-back-fill.png" alt="rating-star" width={24} height={24} /> Go back
            </div>
                <div className="flex justify-between items-start w-full px-32">
                        <div className="flex flex-col items-start gap-3">
                                <div className="flex items-start gap-2">
                                        {selectedRide?.driveType === "chaffeured" && <div className="flex h-5 py-1 px-2 items-center gap-1 tz-bg-green rounded">
                                                <Image src="/assets/images/user-icons.png" alt="logo icon" width={12} height={12} />
                                                <span className="text-xs font-semibold tz-text-green">Chauffeurred</span>
                                        </div>}
                                        <div className="flex h-5 py-1 px-2 items-center gap-1 tz-bg-green rounded">
                                                {/*<Image src="/assets/images/user-icons.png" alt="logo icon" width={12} height={12} />*/}
                                                <span className="text-xs font-semibold tz-text-green">Promoted</span>
                                        </div>
                                </div>
                                <div className="text-3xl font-semibold tz-text-dark">{vehicleName}</div>
                                <div className="flex items-start gap-3">
                                        <div className="flex items-center gap-1">
                                                <Image src="/assets/images/star.png" alt="rating-star" width={16} height={16} />
                                                <span className="text-sm font-bold tz-text-dark-1">4.9</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                                <p className="text-sm text-opacity-80 tz-text-dark">(34 reviews)</p>
                                                <div className="w-2 h-2 rounded-full tz-bg-gray-2"></div>
                                                <p className="text-sm text-opacity-80 tz-text-dark">x1 2.0i ( 181bhp ) {vehicleYear} auto</p>
                                        </div>
                                </div>
                        </div>
                        <div className="flex flex-col items-start gap-4">
                                <Link href="/account/profile">Profile Pages</Link>
                                <div className="flex items-center gap-5">
                                        <Image src="/assets/images/heart-2-line.png" alt="logo icon" width={32} height={32} />
                                        <Image src="/assets/images/share-box-fill.png" alt="logo icon" width={32} height={32} />
                                        <Button1 onClick={handleReserveClicked} submit={true} text="Reserve" url="" width={"56"} />
                                </div>
                                <div className="flex items-center gap-2 p-2 justify-end w-full">
                                        <Image src="/assets/images/refund-fill.png" alt="logo icon" width={24} height={24} />
                                        <p className="text-sm font-medium tz-text-dark-1">Free Cancellation</p>
                                </div>
                        </div>
                </div>
            <div className="my-20"></div>
            <VehicleImage images={carImages} />
            <div className="my-20"></div>
                {selectedRide && <BookingDetails description={selectedRide?.vehicle?.vehicleGuideLine}
                            amenities={selectedRide?.vehicle?.vehicleAmenities} price={priceCalculated}
                onReserve={actualHandleReserveClicked} ride={selectedRide} localPrice={priceCalculatedLocal}
                priceShown={priceShown} onBook={handleBookOrder} />}
            <div className="my-20"></div>
            {/*<MapSection ride={selectedRide} />*/}
            <div className="mt-24 pt-16 pb-10 tz-bg-light">
                <BreadCrumb links={["Rent a car", "Ikejah", "Mercedes", "Mercedes Mayback 20233"]} />
            </div>
            <LocationSection />
            <div className="pt-24 tz-bg-light"></div>
            <Footer />
            <Signup isOpen={showSignupModal} closeModal={handleCloseSignupModal} onLoginPressed={handleLoginLinkClicked} />
            <Login isOpen={showLoginModal} closeModal={handleCloseModal} onRegister={handleSignupLinkClicked}
                   onForgotPassword={handleForgotLinkClicked} />
            <NewPassword isOpen={showResetModal} closeModal={handleCloseResetModal}
                         onBackClicked={handleBackToForgotPassword} onNextStep={handleShowNSuccessCard} />
            <ForgotPassword isOpen={showForgotModal} closeModal={handleCloseForgotModal} onBackClicked={handleBackToLogin}
                            onNextStep={handleShowEmailOTP}/>
            <EmailOTP numberOfDigits={5} isOpen={showOTPModal} closeModal={handleCloseOTPModal}
                onBackClicked={handleBackToForgotPassword} onNextStep={handleShowNewPassword}/>
            <SuccessCard 
                title={"Password reset successful!"} 
                description={"Your request to reset your password is completed. Proceed to login with your new password."} 
                btnText={"Log in"} 
                modalId={"password-reset-success-modal"}
                isOpen={showSuccessCard} closeModal={handleCloseSuccessCard}
                onNextStep={handleShowNewPassword}
            />
            <ReviewReservation show={showReviewReservation} hideModal={handleCloseReviewReservation} />
        </div>
    );
};

export default Page;

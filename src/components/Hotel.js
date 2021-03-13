import React, { useEffect, useState } from 'react';

const Hotel = () => {
    const [roomCount, setRoomCount] = useState(1)
    const [adultCount, setAdultCount] = useState(1)
    const [childrenCount, setChildrenCount] = useState(0)
    const [disableDecRoom, setDisableDecRoom] = useState(false)
    const [disableIncRoom, setDisableIncRoom] = useState(false)
    const [disableDecAdult, setDisableDecAdult] = useState(false)
    const [disableIncAdult, setDisableIncAdult] = useState(false)
    const [disableDecChildren, setDisableDecChildren] = useState(false)
    const [disableIncChildren, setDisableIncChildren] = useState(false)


    useEffect(() => {
        if (roomCount === 1) {
            setDisableDecRoom(true)
        }
        if (roomCount === 5) {
            setDisableIncRoom(true)
        }
        if (adultCount === 1) {
            setDisableDecAdult(true)
        }
        if (childrenCount === 0) {
            setDisableDecChildren(true)
        }

        if (roomCount > adultCount) {
            setAdultCount(count => count + 1)
        }

        if (roomCount === adultCount) {
            setDisableDecAdult(true)
        }

        if (adultCount + childrenCount >= roomCount * 4) { //4+4 >= 8
            setDisableIncAdult(true)
            setDisableIncChildren(true)
        } else {
            setDisableIncAdult(false)
            setDisableIncChildren(false)
        }

        if (roomCount * 4 < adultCount + childrenCount) {
            let adultsToBeRemoved
            if (childrenCount === 0) {
                setAdultCount(roomCount * 4)
            }
            else if (childrenCount < 4 && childrenCount > 0) {
                console.log(roomCount, adultCount, childrenCount)
                if (adultCount >= 4) setChildrenCount(0)
                else setChildrenCount((adultCount + childrenCount) - roomCount * 4)
                // adultsToBeRemoved = 4 - childrenCount
                // setAdultCount(adultCount - adultsToBeRemoved)
            }
            else if (childrenCount >= 4) {
                // setChildrenCount(count=> count - 4)
                setChildrenCount(4 * roomCount - adultCount)
            }
        }



    }, [roomCount, adultCount, childrenCount])


    const handleRoom = (op) => {
        if (op === "inc") {
            setDisableDecRoom(false)
            setRoomCount(count => count + 1)
        } else if (op === "dec") {
            setDisableDecAdult(false)
            setDisableIncRoom(false)
            setRoomCount(count => count - 1)
        }

    }
    const handleAdults = (op) => {
        if (op === "inc") {
            setDisableDecAdult(false)
            setAdultCount(count => count + 1)
        } else if (op === "dec") {
            setAdultCount(count => count - 1)
        }
    }
    const handleChildren = (op) => {
        if (op === "inc") {
            setDisableDecChildren(false)
            setChildrenCount(count => count + 1)
        } else if (op === "dec") {
            setChildrenCount(count => count - 1)
        }
    }
    return (
        <>
            <div className="wrapper">
                Choose number of <b>people</b>
                <div className="infoWrapper">
                    <div className="room">
                        <span>Rooms</span><span><button disabled={disableDecRoom} onClick={() => handleRoom("dec")} className="decrease">-
                        </button> {roomCount} <button disabled={disableIncRoom} onClick={() => handleRoom("inc")} className="increase">+</button></span>
                    </div>
                    <div className="adults">
                        <span>Adults</span><span><button disabled={disableDecAdult} onClick={() => handleAdults("dec")} className="decrease">-</button> {adultCount} <button disabled={disableIncAdult} onClick={() => handleAdults("inc")} className="increase">+</button></span>
                    </div>
                    <div className="children">
                        <span>Children</span><span><button disabled={disableDecChildren} onClick={() => handleChildren("dec")} className="decrease">-</button> {childrenCount} <button disabled={disableIncChildren} onClick={() => handleChildren("inc")} className="increase">+</button></span>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Hotel;
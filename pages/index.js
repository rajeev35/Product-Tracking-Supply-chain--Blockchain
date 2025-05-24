// pages/index.jsx
import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
  SendShipment,
  ShipCount,            // ← import the new component
} from "../Components";
import { TrackingContext } from "../Conetxt/Tracking";

export default function Dashboard() {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);

  // State for each modal
  const [sendModel, setSendModel] = useState(false);
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModel, setStartModel] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);
  const [countModel, setCountModel] = useState(false);  // ← count modal

  const [allShipmentsData, setAllShipmentsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllShipment();
      setAllShipmentsData(data);
    }
    fetchData();
  }, [getAllShipment]);

  return (
    <>
      <Services
        setSendModel={setSendModel}
        setCompleteModal={setCompleteModal}
        setGetModel={setGetModel}
        setStartModel={setStartModel}
        setOpenProfile={setOpenProfile}
        setCountModel={setCountModel}         // ← pass it here
      />

      <Table
        setCreateShipmentModel={setCreateShipmentModel}
        allShipmentsdata={allShipmentsData}
      />

      <Form
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
      />

      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentCount={getShipmentsCount}
      />

      <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
      />

      <GetShipment
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />

      <StartShipment
        startModel={startModel}
        setStartModel={setStartModel}
        startShipment={startShipment}
      />

      <SendShipment
        sendModel={sendModel}
        setSendModel={setSendModel}
      />

      {/* Render the ShipCount modal */}
      <ShipCount
        countModel={countModel}
        setCountModel={setCountModel}
      />
    </>
  );
}

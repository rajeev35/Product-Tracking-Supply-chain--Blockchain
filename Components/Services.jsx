import images from "../Images/index";
import Image from "next/image";

export default function Services({
  setSendModel,
  setCompleteModal,
  setGetModel,
  setStartModel,
  setOpenProfile,
  setCountModel,    // added for Shipment Count modal
}) {
  const team = [
    { avatar: images.send },            // Send Shipment
    { avatar: images.compShipment },    // Complete Shipment
    { avatar: images.getShipment },     // Get Shipment
    { avatar: images.startShipment },   // Start Shipment
    { avatar: images.userProfile },     // Profile
    { avatar: images.shipCount },       // Shipment Count
  ];

  const openModelBox = (index) => {
    switch (index) {
      case 0:
        setSendModel(true);
        break;
      case 1:
        setCompleteModal(true);
        break;
      case 2:
        setGetModel(true);
        break;
      case 3:
        setStartModel(true);
        break;
      case 4:
        setOpenProfile(true);
        break;
      case 5:
        setCountModel(true);  // trigger ShipCount modal
        break;
      default:
        break;
    }
  };

  return (
    <section className="py-0 pb-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {team.map((item, i) => (
              <li key={i}>
                <div
                  onClick={() => openModelBox(i)}
                  className="w-full h-60 sm:h-52 md:h-56 cursor-pointer"
                >
                  <Image
                    src={item.avatar}
                    className="w-full object-cover object-center shadow-md rounded-xl"
                    alt=""
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

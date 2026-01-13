import { createContext, useEffect, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      // () => {
      //   // fallback (optional)
      //   setLocation({ lat: 32.0883, lng: 76.2645 }); //Dharamshala Fallback
      // },
      {
        enableHighAccuracy: true, // 👈 Force better accuracy
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;

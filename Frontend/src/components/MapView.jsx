import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

function createPriceIcon(price) {
    const isMobile = window.innerWidth <= 600;
    return L.divIcon({
        html: `
            <div style="
                display:flex;
                flex-direction:column;
                align-items:center;
            ">
                <div style="
                    background:#C8102E;
                    color:white;
                    padding:${isMobile ? "6px 10px" : "10px 16px"};
                    border-radius:24px;
                    font-weight:700;
                    font-size:${isMobile ? "11px" : "14px"};
                    box-shadow:0 6px 18px rgba(0,0,0,0.25);
                    white-space:nowrap;
                    border:2px solid white;
                ">
                    ${price} EUR
                </div>

                <div style="
                    width:0;
                    height:0;
                    border-left:8px solid transparent;
                    border-right:8px solid transparent;
                    border-top:12px solid #C8102E;
                    margin-top:-2px;
                "></div>
            </div>
        `,
        className: "",
        iconSize: isMobile ? [65, 40] : [90, 52],
        iconAnchor: isMobile ? [32, 40] : [45, 52],
    });
}

function createAdagioPin() {
    return L.divIcon({
        html: `
            <div style="
                position:relative;
                width:26px;
                height:26px;
                background:black;
                border:4px solid black;
                border-radius:50% 50% 50% 0;
                transform:rotate(-45deg);
                box-shadow:0 4px 12px rgba(0,0,0,0.3);
            ">
                <div style="
                    position:absolute;
                    width:10px;
                    height:10px;
                    background:white;
                    border-radius:50%;
                    top:50%;
                    left:50%;
                    transform:translate(-50%, -50%) rotate(45deg);
                "></div>
            </div>
        `,
        className: "",
        iconSize: [26, 26],
        iconAnchor: [13, 26],
    });
}

function MapUpdater({ hotels }) {
    const map = useMap();

    useEffect(() => {
        if (!hotels || hotels.length === 0) return;

        if (hotels.length === 1) {
            map.flyTo(
                [hotels[0].latitude, hotels[0].longitude],
                13,
                { duration: 1.5 }
            );
            return;
        }

        const bounds = hotels.map((hotel) => [
            hotel.latitude,
            hotel.longitude,
        ]);

        map.flyToBounds(bounds, {
            padding: [50, 50],
            duration: 1.5,
        });
    }, [hotels, map]);

    return null;
}

function MapView({
    hotels = [],
    showPrices = false,
    setSelectedHotel
}) {
    return (
        <MapContainer
            center={[48.8566, 2.3522]}
            zoom={5}
            minZoom={4}
            maxZoom={18}
            worldCopyJump={false}
            style={{
                height: "100%",
                width: "100%",
            }}
        >
            <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles © Esri"
            />

            <MapUpdater hotels={hotels} />

            {hotels.map((hotel) => (
                <Marker
                    key={hotel.id}
                    position={[hotel.latitude, hotel.longitude]}
                    icon={
                        showPrices
                            ? createPriceIcon(hotel.dynamic_price || hotel.price_per_night)
                            : createAdagioPin()
                    }
                    eventHandlers={{
                        click: () => {
                            setSelectedHotel(hotel);
                        },
                    }}
                />
            ))}
        </MapContainer>
    );
}

export default MapView;
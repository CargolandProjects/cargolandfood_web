import React from 'react';
import { minusBtn, plusBtn, deleteIcon } from "@/assets/images";

// --- MOCK DATA STRUCTURES ---
interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    modifier?: string;
}

interface OrderPack {
    packId: string;
    packName: string;
    items: OrderItem[];
}

// --- MOCK DATA ---
const mockOrders: OrderPack[] = [
    {
        packId: "p1",
        packName: "Pack 1",
        items: [
            {
                id: "i1",
                name: "Pepperoni Pizza",
                price: 13450,
                quantity: 1,
                modifier: "+ extra sausage",
            },
            {
                id: "i2",
                name: "Packs",
                price: 250,
                quantity: 1,
            },
        ],
    },
    {
        packId: "p2",
        packName: "Pack 2",
        items: [
            {
                id: "i3",
                name: "Chicken Burger",
                price: 9800,
                quantity: 2,
                modifier: "+ large coke",
            },
        ],
    },
];

interface CheckoutPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

// Function to format Nigerian Naira
const formatNaira = (amount: number) => {
    return `₦${amount.toLocaleString('en-NG')}`;
};

const CheckoutPanel: React.FC<CheckoutPanelProps> = ({ onClose }) => {

    return (
        <div
            className="bg-white rounded-xl shadow-lg w-full h-[670px] overflow-hidden flex flex-col"
            role="region"
            aria-label="Order Checkout Summary"
        >
            <div className="py-6 px-4 flex-grow overflow-y-auto"> {/* Added overflow-y-auto for content */}

                {/* Checkout Header */}
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                    <h2 className="text-[20px] font-medium leading-7">
                        Checkout
                    </h2>
                </div>

                {/* Content Scrollable Area (Packs) */}
                <div className="space-y-4">

                    {/* DYNAMIC PACK RENDERING */}
                    {mockOrders.map((pack) => (
                        <div key={pack.packId} className="p-4 border border-[#E2E4E9] rounded-lg">

                            {/* Pack Header (Pack 1 / Pack 2) */}
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-normal leading-5">{pack.packName}</p>
                                <button className="hover:opacity-70 transition-opacity" aria-label={`Remove ${pack.packName}`}>
                                    <img src={deleteIcon.src} alt="Delete" className="w-8 h-8" />
                                </button>
                            </div>

                            {/* DYNAMIC ITEMS RENDERING */}
                            {pack.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center py-2">
                                    <div className="flex items-start">

                                        {/* Quantity & Name */}
                                        <span className="text-[20px] font-medium leading-7 mr-3">{item.quantity}x</span>

                                        <div>
                                            <p className="text-base font-normal leading-5">
                                                {item.name}
                                            </p>

                                            {/* Modifier (only show if it exists) */}
                                            {item.modifier && (
                                                <p className="text-sm text-gray-500 font-normal leading-5">
                                                    {item.modifier}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Side: Price */}
                                    {/* Check if item is "Packs" which needs the quantity control */}
                                    {item.name === "Packs" ? (
                                        // Quantity Control for "Packs" item
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center border border-gray-300 rounded-full">
                                                <button
                                                    className="w-[20px] h-[20px] flex items-center justify-center rounded-full p-[2px] hover:bg-gray-50 transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <img src={minusBtn.src} alt="Minus" className="w-full h-full object-contain" />
                                                </button>
                                                <span className="px-1 text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    className="w-[20px] h-[20px] flex items-center justify-center rounded-full p-[2px] hover:bg-gray-50 transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <img src={plusBtn.src} alt="Plus" className="w-full h-full object-contain" />
                                                </button>
                                            </div>
                                            <p className="text-base font-medium leading-6">{formatNaira(item.price)}</p>
                                        </div>
                                    ) : (
                                        // Standard Price for other items
                                        <p className="text-base font-medium leading-6">
                                            {formatNaira(item.price * item.quantity)}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    {/* END DYNAMIC PACK RENDERING */}

                </div>
            </div>

            {/* Footer buttons */}
            <div className="py-6 px-4 border-t border-gray-100 bg-white">
                <div className="flex space-x-4">

                    {/* PLACE ORDER Button */}
                    <button
                        className="flex-1 bg-orange-600 text-white p-[10px] rounded-[10px] shadow-md 
                                   hover:bg-orange-700 transition-colors h-[48px] 
                                   flex items-center justify-center"
                    >
                        <span className="text-sm font-bold leading-5">
                            PLACE ORDER
                        </span>
                    </button>

                    {/* CANCEL ORDERS Button */}
                    <button
                        onClick={onClose}
                        className="flex-1 bg-white border border-gray-300 text-[#868C98] p-[10px] rounded-[10px] 
                                   font-semibold hover:bg-gray-50 transition-colors h-[48px] 
                                   flex items-center justify-center"
                    >
                        <span className="text-sm font-bold leading-5">
                            CANCEL ORDERS
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPanel;

import React from 'react';
import { minusBtn, plusBtn, deleteIcon } from "@/assets/images";

// Keeping the minimal interface for React component compatibility
interface CheckoutPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const CheckoutPanel: React.FC<CheckoutPanelProps> = () => {

    return (
        <div
            // Width is controlled by the parent element: w-[400px] in ReastaurantPageContent
            // Fixed height: h-[670px]
            // Border Radius: rounded-xl (Matches 12px)
            className="bg-white rounded-xl shadow-lg w-full h-[670px] overflow-hidden flex flex-col"
            role="region"
            aria-label="Order Checkout Summary"
        >
            {/* Inner Content Area - Uses specific padding for top/bottom, separate for left/right */}
            <div className="py-6 px-4 flex-grow">
                {/* Header (Adjusted to match left/right padding) */}
                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                    <h2
                        // text-[20px] for 20px size, font-medium for 500 weight, leading-7 for 28px line-height
                        className="text-[20px] font-medium leading-7"
                    >
                        Checkout
                    </h2>
                </div>

                {/* Content Scrollable Area */}
                <div className="space-y-4">
                    {/* Pack 1 */}
                    {/* NOTE: Padding inside the pack is kept general, but the overall card padding is applied above */}
                    <div className="p-4 border border-gray-100 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            {/* Original: font-medium text-lg */}
                            {/* Updated: text-sm (14px) font-normal (400 weight) leading-5 (20px line-height) */}
                            <p className="text-sm font-normal leading-5">Pack 1</p>
                            <button className="hover:opacity-70 transition-opacity" aria-label="Remove Pack 1">
                                <img src={deleteIcon.src} alt="Delete" className="w-8 h-8" />
                            </button>
                        </div>
                        <div className="flex justify-between items-center py-2">

                            {/* Left Side: Quantity and Item Details */}
                            <div className="flex items-start">

                                {/* 1. Quantity (1x) */}
                                {/* width: 17, height: 28, font-size: 20px, font-weight: 500, line-height: 28px */}
                                <span
                                    // text-[20px] for 20px size, font-medium for 500 weight, leading-7 for 28px line-height
                                    className="text-[20px] font-medium leading-7 mr-3"
                                >
                                    1x
                                </span>

                                <div>
                                    {/* 2. Item Name (Pepperoni Pizza) */}
                                    {/* width: 125, height: 20, font-size: 16px, font-weight: 400, line-height: 20px */}
                                    <p
                                        // text-base for 16px size, font-normal for 400 weight, leading-5 for 20px line-height
                                        className="text-base font-normal leading-5"
                                    >
                                        Pepperoni Pizza
                                    </p>

                                    {/* 3. Modifier (+ extra sausage) */}
                                    {/* width: 125, height: 24, font-size: 14px, font-weight: 400, line-height: 20px */}
                                    <p
                                        // text-sm for 14px size, font-normal for 400 weight, leading-5 for 20px line-height
                                        className="text-sm text-gray-500 font-normal leading-5"
                                    >
                                        + extra sausage
                                    </p>
                                </div>
                            </div>

                            {/* Right Side: Price */}
                            {/* 4. Price (₦13,450) */}
                            {/* width: 59, height: 24, font-size: 16px, font-weight: 500, line-height: 24px */}
                            <p
                                // text-base for 16px size, font-medium for 500 weight, leading-6 for 24px line-height
                                className="text-base font-medium leading-6"
                            >
                                ₦13,450
                            </p>
                        </div>
                        <div className="flex justify-between items-center py-2">

                            {/* Left Side: Quantity, Item Name, and Quantity Control */}
                            <div className="flex items-center gap-4">

                                {/* 1. Quantity (1x) - STYLES: 20px size, 500 weight, 28px line height */}
                                <span className="text-[20px] font-medium leading-7">1x</span>

                                {/* 2. Item Name (Packs) - STYLES: 16px size, 400 weight, 20px line height */}
                                <p className="text-base font-normal leading-5">Packs</p>

                                {/* 3. Quantity Control - moved next to the text */}
                                <div className="flex items-center border border-gray-300 rounded-full">

                                    {/* Minus Button */}
                                    {/* WIDTH/HEIGHT/PADDING: w-[20px] h-[20px] p-[2px] rounded-full */}
                                    <button
                                        className="w-[20px] h-[20px] flex items-center justify-center rounded-full p-[2px] hover:bg-gray-50 transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        {/* Replace text with image asset. Adjust the image src/alt as needed. */}
                                        <img src={minusBtn.src} alt="Minus" className="w-full h-full object-contain" />
                                    </button>

                                    {/* Quantity Display */}
                                    <span className="px-1 text-sm font-medium">1</span>

                                    {/* Plus Button */}
                                    {/* WIDTH/HEIGHT/PADDING: w-[20px] h-[20px] p-[2px] rounded-full */}
                                    <button
                                        className="w-[20px] h-[20px] flex items-center justify-center rounded-full p-[2px] hover:bg-gray-50 transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        {/* Replace text with image asset. Adjust the image src/alt as needed. */}
                                        <img src={plusBtn.src} alt="Plus" className="w-full h-full object-contain" />
                                    </button>

                                </div>

                            </div>

                            {/* Right Side: Price (₦250) - STYLES: 16px size, 500 weight, 24px line height */}
                            <p className="text-base font-medium leading-6">₦250</p>

                        </div>
                    </div>
                </div>
            </div>

            {/* Footer buttons - Uses specific padding */}
            <div className="py-6 px-4 border-t border-gray-100 bg-white">
                <div className="flex space-x-4">

                    {/* PLACE ORDER Button */}
                    <button
                        // New styles applied:
                        // Custom padding p-[10px], rounded-[10px] for radius, h-[48px] for height
                        // w-full inside w-1/2 from the previous step is conflicting. 
                        // We use specific width here if you want it exactly 205px wide, or flex-1/2 for distribution.
                        // Assuming you want the buttons to be equally sized:
                        className="flex-1 bg-orange-600 text-white p-[10px] rounded-[10px] shadow-md 
                       hover:bg-orange-700 transition-colors h-[48px] 
                       flex items-center justify-center" // Added flex for internal text centering
                    >
                        <span
                            // Text styles: 14px, Bold (700), 20px line-height
                            className="text-sm font-bold leading-5"
                        >
                            PLACE ORDER
                        </span>
                    </button>

                    {/* CANCEL ORDERS Button (Applying symmetric structure for alignment) */}
                    <button
                        // Applying the same height, padding, and radius as the orange button for alignment
                        // UPDATED: Replaced 'text-gray-700' with custom color 'text-[#868C998]'
                        className="flex-1 bg-white border border-gray-300 text-[#868C98] p-[10px] rounded-[10px] 
               font-semibold hover:bg-gray-50 transition-colors h-[48px] 
               flex items-center justify-center"
                    >
                        <span
                            // Text styles: 14px, Bold (700), 20px line-height (inherited color from button parent)
                            className="text-sm font-bold leading-5"
                        >
                            CANCEL ORDERS
                        </span>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default CheckoutPanel;
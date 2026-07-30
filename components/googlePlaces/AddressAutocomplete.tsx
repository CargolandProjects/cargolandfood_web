"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useDebounce } from "@/lib/hooks/useDebounce";

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void; // NEW
  onBlur?: () => void;
  onSelect?: (place: google.maps.places.Place) => void;
  placeholder?: string;
  readOnly?: boolean;
  countryCode?: string;
  className?: string;
  inputClassName?: string;
}

export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  onFocus,
  onBlur,
  placeholder,
  readOnly = false,
  countryCode,
  className = "",
  inputClassName = "",
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const placesLibrary = useMapsLibrary("places");
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompleteSuggestion[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const requestIdRef = useRef(0);
  const debouncedValue = useDebounce(value, 300);

  const fetchSuggestions = useCallback(
    async (input: string) => {
      const currentRequestId = ++requestIdRef.current;

      if (!placesLibrary || input.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const { AutocompleteSuggestion } = placesLibrary;
        const request: google.maps.places.AutocompleteRequest = {
          input: input,
          //   includedPrimaryTypes: ["point_of_interest"],
          language: "en",
        };

        if (countryCode) {
          request.includedRegionCodes = [countryCode.toUpperCase()];
        }

        const { suggestions } =
          await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

        if (currentRequestId === requestIdRef.current) {
          setSuggestions(suggestions);
        }
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
        if (currentRequestId === requestIdRef.current) {
          setSuggestions([]);
        }
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    },
    [placesLibrary, countryCode],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSuggestions(debouncedValue);
  }, [debouncedValue, fetchSuggestions]);

  const handleSelect = async (
    suggestion: google.maps.places.AutocompleteSuggestion,
  ) => {
    try {
      const place = await suggestion.placePrediction?.toPlace();
      if (place) {
        await place.fetchFields({
          fields: ["formattedAddress", "addressComponents", "id", "location"],
        });
        onChange(place.formattedAddress || "");
        if (onSelect) onSelect(place);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        value={value}
        autoComplete="new-address"
        onChange={(e) => {
          onChange(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => {
          if (onFocus) onFocus();
          setShowDropdown(true);
        }}
        onBlur={() => {
          if (onBlur) onBlur();
          setTimeout(() => setShowDropdown(false), 150);
        }}
        placeholder={placeholder}
        readOnly={readOnly}
        className={inputClassName}
      />
      {showDropdown && (suggestions.length > 0 || isLoading) && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {isLoading && (
            <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
          )}
          {!isLoading &&
            suggestions.map((suggestion) => (
              <div
                key={suggestion.placePrediction?.placeId}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onMouseDown={() => handleSelect(suggestion)}
              >
                {suggestion.placePrediction?.text?.text ||
                  suggestion.placePrediction?.secondaryText?.text}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

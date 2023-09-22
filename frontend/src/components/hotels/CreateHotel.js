import React, { useState } from "react";
import AddCircular from "../Icons/Add";
import axios from "axios";

const CreateHotel = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thumbnail: "",
    photos: [],
    facilities: [],
    totalBookings: 0,
    rating: 0,
    minPrice: 0,
    maxPrice: 0,
    type: "",
    address: {
      street: "",
      city: "",
      // state: "",
      // country: "",
      // zip: "",
    },
  });

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT + "/api";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // for address
    const nameParts = name.split(".");
    if (nameParts.length === 2) {
      setFormData({
        ...formData,
        [nameParts[0]]: {
          ...formData[nameParts[0]],
          [nameParts[1]]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleAddPhoto = () => {
    const newPhotos = [...formData.photos];
    newPhotos.push(""); // Add an empty string for a new photo URL
    setFormData({ ...formData, photos: newPhotos });
  };

  const handleAddFacility = () => {
    const newFacilities = [...formData.facilities];
    newFacilities.push(""); // Add an empty string for a new facility
    setFormData({ ...formData, facilities: newFacilities });
  };

  // Handle changing a specific facility
  const handleFacilityChange = (e, index) => {
    const newFacilities = [...formData.facilities];
    newFacilities[index] = e.target.value;
    setFormData({ ...formData, facilities: newFacilities });
  };

  // Handle changing a specific photo URL
  const handlePhotoChange = (e, index) => {
    const newPhotos = [...formData.photos];
    newPhotos[index] = e.target.value;
    setFormData({ ...formData, photos: newPhotos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiEndpoint + "/hotels/", formData);
      console.log("Hotel created:", response.data);
      // Reset the form after successful submission
      setFormData({
        name: "",
        description: "",
        thumbnail: "",
        photos: [],
        facilities: [],
        totalBookings: 0,
        rating: 0,
        minPrice: 0,
        maxPrice: 0,
        type: "",
        address: {
          street: " ",
          city: " ",
          // state: "",
          // country: "",
          // zip: "",
        },
      });
    } catch (error) {
      console.error("Error creating hotel:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow bg-gray-100 p-4 flex-grow">
      <div class="text-center">
        <div class="text-2xl font-semibold">Admin Panel</div>
        <div class="text-xs bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent">
          Powered by Alpha
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Hotel Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Hotel Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Hotel Name"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        {/* Thumbnail */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Thumbnail URL
          </label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleInputChange}
            placeholder="Thumbnail URL"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Photos */}
        <div className="mb-4 flex flex-wrap items-center">
          <label className="block text-gray-700 text-sm font-bold mb-2 mr-10">
            Photos
          </label>
          {formData.photos.map((photo, index) => (
            <div key={index} className="w-full md:w-5/6">
              <input
                type="text"
                name={`photos[${index}]`}
                value={photo}
                onChange={(e) => handlePhotoChange(e, index)}
                placeholder="Photo URL"
                className="border rounded w-100% py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          <div className="w-full md:w-1/6 mt-2 md:mt-0">
            <button
              type="button"
              onClick={handleAddPhoto}
              className="bg-gray-500 hover:bg-black-700 text-white font-bold py-1 px-1 rounded-full focus:outline-none focus:shadow-outline w-6 h-6 flex items-center justify-center"
            >
              <AddCircular />
            </button>
          </div>
        </div>
        {/* Facilities */}
        <div className="mb-4 flex flex-wrap items-center">
          <label className="block text-gray-700 text-sm font-bold mb-2 mr-10">
            Facilities
          </label>
          {formData.facilities.map((facility, index) => (
            <div key={index} className="w-full md:w-5/6">
              <input
                type="text"
                name={`facilities[${index}]`}
                value={facility}
                onChange={(e) => handleFacilityChange(e, index)}
                placeholder="Facility"
                className="border rounded w-100% py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          <div className="w-full md:w-1/6 mt-2 md:mt-0">
            <button
              type="button"
              onClick={handleAddFacility}
              className="bg-gray-500 hover:bg-black-700 text-white font-bold py-1 px-1 rounded-full focus:outline-none focus:shadow-outline w-6 h-6 flex items-center justify-center"
            >
              <AddCircular />
            </button>
          </div>
        </div>
        {/* Total Bookings */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Total Bookings
          </label>
          <input
            type="number"
            name="totalBookings"
            value={formData.totalBookings}
            onChange={handleInputChange}
            placeholder="Total Bookings"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Min Price */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Min Price
          </label>
          <input
            type="number"
            name="minPrice"
            value={formData.minPrice}
            onChange={handleInputChange}
            placeholder="Min Price"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Max Price */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Max Price
          </label>
          <input
            type="number"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleInputChange}
            placeholder="Max Price"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Type
          </label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            placeholder="Type"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Rating (0 - 5)
          </label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            placeholder="rating"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Street */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Street
          </label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleInputChange}
            placeholder="Address-street"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* city */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            City
          </label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleInputChange}
            placeholder="city"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-4 text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-400 to-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Hotel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateHotel;

// <div className="h-screen flex flex-col">
//       {/* Section 1 */}
//       <div className="bg-gray-200 p-4">
//         <div class="text-center">
//           <div class="text-2xl font-semibold">Admin Panel</div>
//           <div class="text-xs text-red-700">Powered by Alpha</div>
//         </div>
//         <form onSubmit={handleSubmit}>
//           {/* ... your form fields for Section 1 ... */}
//         </form>
//       </div>

//       {/* Section 2 */}
//       <div className="bg-gray-100 p-4 flex-grow">
//         {/* ... your form fields for Section 2 ... */}
//       </div>

//       {/* Section 3 */}
//       <div className="bg-gray-200 p-4">
//         {/* ... your form fields for Section 3 ... */}
//       </div>
//     </div>

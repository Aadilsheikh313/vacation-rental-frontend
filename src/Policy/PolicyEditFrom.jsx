import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { policesGet, policesUpdate } from "../config/redux/action/policeyAction";
import { resetStatus } from "../config/redux/reducer/policeyReducer";

const PolicyEditForm = () => {
  const { id: propertyId } = useParams();
  const dispatch = useDispatch();

  const { policy, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.policy
  );

  const [formData, setFormData] = useState(null);

  // Fetch existing policy when page loads
  useEffect(() => {
    if (propertyId) {
      dispatch(policesGet(propertyId));
    }
  }, [dispatch, propertyId]);

  // Update formData once policy is fetched
  useEffect(() => {
    if (policy) {
      setFormData(policy);
    }
  }, [policy]);

  // Handle input changes (nested updates)
  const handleChange = (e, path) => {
    const { type, checked, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let obj = updated;
      keys.slice(0, -1).forEach((k) => (obj = obj[k]));
      obj[keys[keys.length - 1]] = type === "checkbox" ? checked : value;
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(policesUpdate({ propertyId, policesData: formData }));
  };

  // Reset status after success/error
  useEffect(() => {
    if (isSuccess || isError) {
      const timer = setTimeout(() => {
        dispatch(resetStatus());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isError, dispatch]);

  if (!formData) return <p>Loading policy...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">✏️ Edit Property Policy</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ✅ Check In */}
        <div>
          <h3 className="font-semibold">Check In</h3>
          <input type="text" value={formData.checkIn.start} onChange={(e)=>handleChange(e,"checkIn.start")} className="border p-2 w-full mb-2"/>
          <input type="text" value={formData.checkIn.end} onChange={(e)=>handleChange(e,"checkIn.end")} className="border p-2 w-full mb-2"/>
          <label className="flex gap-2">
            <input type="checkbox" checked={formData.checkIn.earlyCheckIn.allowed} onChange={(e)=>handleChange(e,"checkIn.earlyCheckIn.allowed")}/>
            Early Check In Allowed
          </label>
          <input type="text" value={formData.checkIn.earlyCheckIn.note} onChange={(e)=>handleChange(e,"checkIn.earlyCheckIn.note")} className="border p-2 w-full"/>
        </div>

        {/* ✅ Check Out */}
        <div>
          <h3 className="font-semibold">Check Out</h3>
          <input type="text" value={formData.checkOut.start} onChange={(e)=>handleChange(e,"checkOut.start")} className="border p-2 w-full mb-2"/>
          <input type="text" value={formData.checkOut.end} onChange={(e)=>handleChange(e,"checkOut.end")} className="border p-2 w-full mb-2"/>
          <label className="flex gap-2">
            <input type="checkbox" checked={formData.checkOut.lateCheckOut.allowed} onChange={(e)=>handleChange(e,"checkOut.lateCheckOut.allowed")}/>
            Late Check Out Allowed
          </label>
          <input type="text" value={formData.checkOut.lateCheckOut.charges} onChange={(e)=>handleChange(e,"checkOut.lateCheckOut.charges")} className="border p-2 w-full"/>
        </div>

        {/* ✅ Cancellation */}
        <div>
          <h3 className="font-semibold">Cancellation</h3>
          <input type="number" value={formData.cancellation.freeCancellation.durationHours} onChange={(e)=>handleChange(e,"cancellation.freeCancellation.durationHours")} className="border p-2 w-full mb-2"/>
          <input type="text" value={formData.cancellation.withinDuration.penalty} onChange={(e)=>handleChange(e,"cancellation.withinDuration.penalty")} className="border p-2 w-full mb-2"/>
          <input type="text" value={formData.cancellation.noShow.penalty} onChange={(e)=>handleChange(e,"cancellation.noShow.penalty")} className="border p-2 w-full mb-2"/>
          <input type="number" value={formData.cancellation.peakSeason.requiredAdvanceDays} onChange={(e)=>handleChange(e,"cancellation.peakSeason.requiredAdvanceDays")} className="border p-2 w-full mb-2"/>
          <input type="text" value={formData.cancellation.peakSeason.penalty} onChange={(e)=>handleChange(e,"cancellation.peakSeason.penalty")} className="border p-2 w-full"/>
        </div>

        {/* ✅ House Rules */}
        <div>
          <h3 className="font-semibold">House Rules</h3>
          <label className="flex gap-2">
            <input type="checkbox" checked={formData.houseRules.smoking.allowed} onChange={(e)=>handleChange(e,"houseRules.smoking.allowed")}/>
            Smoking Allowed
          </label>
          <input type="text" value={formData.houseRules.smoking.note} onChange={(e)=>handleChange(e,"houseRules.smoking.note")} className="border p-2 w-full mb-2"/>
          <label className="flex gap-2">
            <input type="checkbox" checked={formData.houseRules.pets.allowed} onChange={(e)=>handleChange(e,"houseRules.pets.allowed")}/>
            Pets Allowed
          </label>
          <input type="number" value={formData.houseRules.pets.fee} onChange={(e)=>handleChange(e,"houseRules.pets.fee")} className="border p-2 w-full mb-2"/>
          <input type="number" value={formData.houseRules.maxOccupancy} onChange={(e)=>handleChange(e,"houseRules.maxOccupancy")} className="border p-2 w-full mb-2"/>
          <input type="text" value={formData.houseRules.quietHours.from} onChange={(e)=>handleChange(e,"houseRules.quietHours.from")} className="border p-2 w-full mb-2"/>
          <input type="text" value={formData.houseRules.quietHours.to} onChange={(e)=>handleChange(e,"houseRules.quietHours.to")} className="border p-2 w-full mb-2"/>
          <label className="flex gap-2">
            <input type="checkbox" checked={formData.houseRules.validIdRequired} onChange={(e)=>handleChange(e,"houseRules.validIdRequired")}/>
            Valid ID Required
          </label>
        </div>

        {/* ✅ Payment & Fees */}
        <div>
          <h3 className="font-semibold">Payment & Fees</h3>
          <label className="flex gap-2">
            <input type="checkbox" checked={formData.paymentAndFees.creditCardRequired} onChange={(e)=>handleChange(e,"paymentAndFees.creditCardRequired")}/>
            Credit Card Required
          </label>
          <input type="number" value={formData.paymentAndFees.cityTax.amount} onChange={(e)=>handleChange(e,"paymentAndFees.cityTax.amount")} className="border p-2 w-full mb-2"/>
          <input type="text" value={formData.paymentAndFees.cityTax.unit} onChange={(e)=>handleChange(e,"paymentAndFees.cityTax.unit")} className="border p-2 w-full mb-2"/>
          <label className="flex gap-2">
            <input type="checkbox" checked={formData.paymentAndFees.cityTax.included} onChange={(e)=>handleChange(e,"paymentAndFees.cityTax.included")}/>
            City Tax Included
          </label>
          <input type="number" value={formData.paymentAndFees.resortFee.amount} onChange={(e)=>handleChange(e,"paymentAndFees.resortFee.amount")} className="border p-2 w-full mb-2"/>
          <input type="text" value={formData.paymentAndFees.resortFee.unit} onChange={(e)=>handleChange(e,"paymentAndFees.resortFee.unit")} className="border p-2 w-full mb-2"/>
          <label className="flex gap-2">
            <input type="checkbox" checked={formData.paymentAndFees.parking.available} onChange={(e)=>handleChange(e,"paymentAndFees.parking.available")}/>
            Parking Available
          </label>
          <select value={formData.paymentAndFees.parking.type} onChange={(e)=>handleChange(e,"paymentAndFees.parking.type")} className="border p-2 w-full mb-2">
            <option value="valet">Valet</option>
            <option value="self">Self</option>
          </select>
          <input type="number" value={formData.paymentAndFees.parking.amount} onChange={(e)=>handleChange(e,"paymentAndFees.parking.amount")} className="border p-2 w-full mb-2"/>
          <input type="text" value={formData.paymentAndFees.parking.unit} onChange={(e)=>handleChange(e,"paymentAndFees.parking.unit")} className="border p-2 w-full"/>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
        >
          {isLoading ? "Updating..." : "Update Policy"}
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-sm ${
          isSuccess ? "text-green-600" : isError ? "text-red-600" : "text-gray-600"
        }`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default PolicyEditForm;

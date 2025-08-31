import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { policesGet, policesUpdate } from "../config/redux/action/policeyAction";

const PolicyEditForm = ({ propertyId }) => {
  const dispatch = useDispatch();
  const { policy, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.policy
  );

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (policy) {
      setFormData(policy);
    }
  }, [policy]);

  // generic nested change handler
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

  useEffect(() => {
  if (propertyId) {
    dispatch(policesGet(propertyId)); // pass karo propertyId
  }
}, [dispatch, propertyId]);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData) return;
    dispatch(policesUpdate({ propertyId, policesData: formData }));
  };



 if (!formData) return <p className="text-center">Loading policy...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">✏️ Edit Property Policy</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ✅ Check In */}
        <div>
          <label>Check In Start</label>
          <input
            type="text"
            value={formData.checkIn.start}
            onChange={(e) => handleChange(e, "checkIn.start")}
            className="border p-2 w-full mb-2"
          />
          <label>Check In End</label>
          <input
            type="text"
            value={formData.checkIn.end}
            onChange={(e) => handleChange(e, "checkIn.end")}
            className="border p-2 w-full mb-2"
          />
          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={formData.checkIn.earlyCheckIn.allowed}
              onChange={(e) => handleChange(e, "checkIn.earlyCheckIn.allowed")}
            />
            Early Check In Allowed
          </label>
          <input
            type="text"
            value={formData.checkIn.earlyCheckIn.note}
            onChange={(e) => handleChange(e, "checkIn.earlyCheckIn.note")}
            className="border p-2 w-full"
          />
        </div>

        {/* ✅ Check Out */}
        <div>
          <label>Check Out Start</label>
          <input
            type="text"
            value={formData.checkOut.start}
            onChange={(e) => handleChange(e, "checkOut.start")}
            className="border p-2 w-full mb-2"
          />
          <label>Check Out End</label>
          <input
            type="text"
            value={formData.checkOut.end}
            onChange={(e) => handleChange(e, "checkOut.end")}
            className="border p-2 w-full mb-2"
          />
          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={formData.checkOut.lateCheckOut.allowed}
              onChange={(e) => handleChange(e, "checkOut.lateCheckOut.allowed")}
            />
            Late Check Out Allowed
          </label>
          <input
            type="text"
            value={formData.checkOut.lateCheckOut.charges}
            onChange={(e) => handleChange(e, "checkOut.lateCheckOut.charges")}
            className="border p-2 w-full"
          />
        </div>

        {/* ✅ Cancellation */}
        <div>
          <label>Free Cancellation (hours)</label>
          <input
            type="number"
            value={formData.cancellation.freeCancellation.durationHours}
            onChange={(e) =>
              handleChange(e, "cancellation.freeCancellation.durationHours")
            }
            className="border p-2 w-full mb-2"
          />
          <label>Penalty (within duration)</label>
          <input
            type="text"
            value={formData.cancellation.withinDuration.penalty}
            onChange={(e) =>
              handleChange(e, "cancellation.withinDuration.penalty")
            }
            className="border p-2 w-full mb-2"
          />
          <label>No Show Penalty</label>
          <input
            type="text"
            value={formData.cancellation.noShow.penalty}
            onChange={(e) => handleChange(e, "cancellation.noShow.penalty")}
            className="border p-2 w-full mb-2"
          />
          <label>Peak Season Advance Days</label>
          <input
            type="number"
            value={formData.cancellation.peakSeason.requiredAdvanceDays}
            onChange={(e) =>
              handleChange(e, "cancellation.peakSeason.requiredAdvanceDays")
            }
            className="border p-2 w-full mb-2"
          />
          <label>Peak Season Penalty</label>
          <input
            type="text"
            value={formData.cancellation.peakSeason.penalty}
            onChange={(e) => handleChange(e, "cancellation.peakSeason.penalty")}
            className="border p-2 w-full"
          />
        </div>

        {/* ✅ House Rules (sirf ek do field sample ke liye) */}
        <div>
          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={formData.houseRules.smoking.allowed}
              onChange={(e) =>
                handleChange(e, "houseRules.smoking.allowed")
              }
            />
            Smoking Allowed
          </label>
          <input
            type="text"
            value={formData.houseRules.smoking.note}
            onChange={(e) => handleChange(e, "houseRules.smoking.note")}
            className="border p-2 w-full mb-2"
          />

          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={formData.houseRules.pets.allowed}
              onChange={(e) => handleChange(e, "houseRules.pets.allowed")}
            />
            Pets Allowed
          </label>
          <input
            type="number"
            value={formData.houseRules.pets.fee}
            onChange={(e) => handleChange(e, "houseRules.pets.fee")}
            className="border p-2 w-full mb-2"
          />
        </div>

        {/* ✅ Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
        >
          {isLoading ? "Updating..." : "Update Policy"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-sm ${
            isSuccess
              ? "text-green-600"
              : isError
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default PolicyEditForm;

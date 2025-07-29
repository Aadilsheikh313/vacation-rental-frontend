import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHostRegister } from "../../config/redux/action/adminHostAction";
import { resetAdminHostState } from "../../config/redux/reducer/adminHostReducer";

const AdminGetAllHost = () => {
  const dispatch = useDispatch();
  const [selectedHost, setSelectedHost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    allHosts,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.adminHost);

  useEffect(() => {
    dispatch(getAllHostRegister());

    return () => {
      dispatch(resetAdminHostState());
    };
  }, [dispatch]);

  const handleViewProperties = (host) => {
    setSelectedHost(host);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHost(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Registered Hosts</h2>

      {isLoading && <p className="text-blue-500">Loading...</p>}
      {isError && <p className="text-red-500">Error: {message}</p>}
      {isSuccess && allHosts.length === 0 && (
        <p className="text-gray-600">No hosts found.</p>
      )}

      {!isLoading && allHosts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Created At</th>
                <th className="py-2 px-4 border">Total Properties</th>
                <th className="py-2 px-4 border">View</th>
              </tr>
            </thead>
            <tbody>
              {allHosts.map((host, index) => (
                <tr key={host._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{host.name}</td>
                  <td className="py-2 px-4 border">{host.email}</td>
                  <td className="py-2 px-4 border">{host.phone}</td>
                  <td className="py-2 px-4 border">
                    {new Date(host.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {host.propertyCount}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      onClick={() => handleViewProperties(host)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedHost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-11/12 max-w-5xl rounded-lg p-6 overflow-y-auto max-h-[90vh] shadow-xl relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold mb-4">
              Properties of {selectedHost.name}
            </h3>

            {selectedHost?.properties?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedHost.properties.map((property, idx) => (
                  <div
                    key={property._id || idx}
                    className="bg-gray-100 p-4 rounded-lg shadow"
                  >
                    <img
                      src={property.images?.[0]}
                      alt="property"
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                    <h4 className="font-bold text-lg">{property.title}</h4>
                    <p className="text-sm text-gray-700">
                      {property.location?.address}
                    </p>
                    <p className="text-sm text-gray-500">
                      ₹{property.pricePerNight} / night
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No properties found for this host.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGetAllHost;

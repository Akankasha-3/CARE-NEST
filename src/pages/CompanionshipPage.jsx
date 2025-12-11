import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CompanionshipPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [duration, setDuration] = useState(1);

  const companionshipServices = [
    {
      id: "call",
      title: "Companionship Call",
      description:
        "Connect with a companion for a friendly phone call and emotional support.",
      price: 99,
      icon: "📞",
    },
    {
      id: "msg",
      title: "Companionship Message",
      description:
        "Exchange messages with a companion for ongoing support and encouragement.",
      price: 49,
      icon: "💬",
    },
  ];

  const calculateTotal = () => {
    if (!selectedService) return 0;
    const service = companionshipServices.find((s) => s.id === selectedService);
    return service ? service.price * duration : 0;
  };

  const navigateToPayment = (serviceParam, typeParam, durationParam, totalParam) => {
    const url = `/payment?service=${encodeURIComponent(serviceParam)}&type=${encodeURIComponent(typeParam)}&duration=${encodeURIComponent(durationParam)}&total=${encodeURIComponent(totalParam)}`;
    
    window.history.pushState({}, "", url);
    // Dispatch popstate so App.tsx's listener reacts and renders PaymentPage
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage="Companionship" />

      {/* Header Section */}
      <div className="relative bg-accent py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Companionship Services
          </h1>
          <p className="max-w-2xl mx-auto text-white text-lg">
            Providing emotional support and meaningful connections through
            personalized services.
          </p>
        </div>
      </div>

      {/* Services + Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">
              Select a Companionship Service
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {companionshipServices.map((service) => (
                <div
                  key={service.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedService === service.id
                      ? "border-accent shadow-md bg-accent bg-opacity-5"
                      : "border-gray-200 hover:border-accent hover:shadow-sm"
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex items-center mb-2">
                    <div className="text-accent mr-2">{service.icon}</div>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {service.description}
                  </p>
                  <p className="text-accent font-semibold">₹{service.price}</p>
                </div>
              ))}
            </div>

            {selectedService && (
              <div className="mt-8 p-6 border rounded-lg bg-white shadow-md">
                <h3 className="text-xl font-bold mb-2">
                  {
                    companionshipServices.find((s) => s.id === selectedService)
                      ?.title
                  }
                </h3>
                <p className="mb-4">
                  {
                    companionshipServices.find((s) => s.id === selectedService)
                      ?.description
                  }
                </p>

                {/* Duration */}
                <div className="mb-4">
                  <label className="font-semibold mr-2">
                    Duration (sessions):
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="border rounded px-2 py-1"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Total */}
                <div className="mb-4">
                  <span className="font-semibold">Total Amount: </span>₹
                  {calculateTotal()}
                </div>

                <button
                  type="button"
                  className="bg-accent text-white px-6 py-2 rounded hover:bg-accent-dark transition"
                  onClick={() => {
                    const total = calculateTotal();
                    //  client-side navigation 
                    navigateToPayment("companionship", selectedService, duration, total);
                  }}
                >
                  Proceed to Pay
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Service Summary</h3>

              {selectedService ? (
                <>
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <p className="text-gray-600 mb-2">Selected Service:</p>
                    <p className="font-semibold">
                      {
                        companionshipServices.find(
                          (s) => s.id === selectedService
                        )?.title
                      }
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <p className="text-gray-600 mb-2">Duration:</p>
                    <p className="font-semibold">
                      {duration} {duration === 1 ? "session" : "sessions"}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-600 mb-2">Total Price:</p>
                    <p className="text-xl font-bold text-accent">
                      ₹{calculateTotal()}
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">
                  Please select a service to see pricing details.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompanionshipPage;

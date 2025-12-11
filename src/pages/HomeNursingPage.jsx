import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Clock, Calendar, CheckCircle } from 'lucide-react';

const HomeNursingPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [duration, setDuration] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  
  const nursingServices = [
    {
      id: 'elderly',
      title: 'Elderly Care',
      description: 'Compassionate care for seniors including assistance with daily activities.',
      pricePerDay: 1000,
      icon: <Clock size={24} />,
    },
    {
      id: 'postop',
      title: 'Post-Surgery Care',
      description: 'Specialized care for individuals recovering from surgery.',
      pricePerDay: 1000,
      icon: <CheckCircle size={24} />,
    },
    {
      id: 'chronic',
      title: 'Chronic Illness Care',
      description: 'Ongoing support for individuals with chronic conditions.',
      pricePerDay: 1500,
      icon: <CheckCircle size={24} />,
    },
    {
      id: 'disability',
      title: 'Disability Support',
      description: 'Assistance for individuals with disabilities.',
      pricePerDay:1500,
      icon: <CheckCircle size={24} />,
    },
  ];
  
  const calculateTotalPrice = () => {
    if (!selectedService) return 0;
    const service = nursingServices.find(s => s.id === selectedService);
    return service ? service.pricePerDay * duration : 0;
  };
  
  const navigateToPayment = (serviceParam, typeParam, durationParam, totalParam) => {
    const url = `/payment?service=${encodeURIComponent(serviceParam)}&type=${encodeURIComponent(typeParam)}&duration=${encodeURIComponent(durationParam)}&total=${encodeURIComponent(totalParam)}`;
    // client-side navigation: update URL and notify  app router
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigateToPayment(selectedService, selectedService, duration, calculateTotalPrice());
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage="Home-Nursing" />
      
      <div className="relative bg-primary py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Professional Home-Nursing Services</h1>
          <p className="max-w-2xl mx-auto text-white text-lg">
            Our skilled and compassionate nursing professionals provide personalized care in the comfort of your home.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Select a Home-Nursing Service</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {nursingServices.map((service) => (
                <div
                  key={service.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedService === service.id
                      ? 'border-primary shadow-md bg-primary bg-opacity-5'
                      : 'border-gray-200 hover:border-primary hover:shadow-sm'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex items-center mb-2">
                    <div className="text-primary mr-2">{service.icon}</div>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <p className="text-primary font-semibold">₹{service.pricePerDay} / day</p>
                </div>
              ))}
            </div>
            
            {selectedService && (
              <div className="mt-8 p-6 border rounded-lg bg-white shadow-md">
                <h3 className="text-xl font-bold mb-2">
                  {nursingServices.find(s => s.id === selectedService)?.title}
                </h3>
                <p className="mb-4">
                  {nursingServices.find(s => s.id === selectedService)?.description}
                </p>
                <div className="mb-4">
                  <label className="font-semibold mr-2">Duration (days):</label>
                  <select
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    className="border rounded px-2 py-1"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="font-semibold mr-2">Start Date:</label>
                  <input
                    id="date"
                    type="date"
                    required
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="border rounded px-2 py-1"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Total Amount: </span>
                  ₹{nursingServices.find(s => s.id === selectedService)?.pricePerDay * duration}
                </div>
                <button
                  type="button"
                  className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
                  onClick={() => {
                    const price = nursingServices.find(s => s.id === selectedService)?.pricePerDay * duration;
                    navigateToPayment('home-nursing', selectedService, duration, price);
                  }}
                >
                  Proceed to Pay
                </button>
              </div>
            )}
          </div>
          
          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Service Summary</h3>
              
              {selectedService ? (
                <>
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <p className="text-gray-600 mb-2">Selected Service:</p>
                    <p className="font-semibold">
                      {nursingServices.find(s => s.id === selectedService)?.title}
                    </p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <p className="text-gray-600 mb-2">Duration:</p>
                    <p className="font-semibold">{duration} {duration === 1 ? 'day' : 'days'}</p>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-gray-600 mb-2">Total Price:</p>
                    <p className="text-xl font-bold text-primary">₹{nursingServices.find(s => s.id === selectedService)?.pricePerDay * duration}</p>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">Please select a service to see pricing details.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomeNursingPage;

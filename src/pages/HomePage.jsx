import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Heart, Users, MessageCircle } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage="Home" />
      
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/7551620/pexels-photo-7551620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Caretaker helping elderly person"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-8 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full">
              <Heart className="h-8 w-8 text-primary" />
              <span className="ml-3 text-2xl md:text-3xl font-bold text-primary">CARETAKERS</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
              Compassionate Care<br className="hidden sm:block" />for Every Need
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white mb-10 leading-relaxed drop-shadow-lg">
              Professional home-nursing, adoption services, and companionship 
              tailored to improve lives and provide support when you need it most.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/home-nursing"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-medium rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
              >
                Our Services
              </a>
              <a
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-medium rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              CARETAKERS provides comprehensive care services to meet various needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary rounded-2xl p-8 text-white transform hover:scale-105 transition-transform">
              <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-6">
                <Heart size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Home-Nursing</h3>
              <p className="mb-6">Professional care services for elderly, sick, or individuals needing assistance at home.</p>
              <a
                href="/home-nursing"
                className="inline-flex items-center px-6 py-3 bg-white rounded-full text-primary font-medium"
              >
                Learn More
              </a>
            </div>
            
            <div className="bg-secondary rounded-2xl p-8 text-white transform hover:scale-105 transition-transform">
              <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-6">
                <Users size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Adoption</h3>
              <p className="mb-6">Helping children find loving homes through our comprehensive adoption services.</p>
              <a
                href="/adoption"
                className="inline-flex items-center px-6 py-3 bg-white rounded-full text-secondary font-medium"
              >
                Learn More
              </a>
            </div>
            
            <div className="bg-accent rounded-2xl p-8 text-white transform hover:scale-105 transition-transform">
              <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-6">
                <MessageCircle size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Companionship</h3>
              <p className="mb-6">Providing emotional support and companionship through calls and messages.</p>
              <a
                href="/companionship"
                className="inline-flex items-center px-6 py-3 bg-white rounded-full text-accent font-medium"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
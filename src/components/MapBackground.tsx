
const MapBackground = () => {
  return (
    <div className="absolute inset-0">
      {/* Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#94a3b8" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Street Layout */}
      <div className="absolute inset-0">
        {/* Horizontal Streets */}
        <div className="absolute top-1/4 left-0 right-0 h-2 bg-gray-300 opacity-70 rounded"></div>
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300 opacity-70 rounded"></div>
        <div className="absolute top-3/4 left-0 right-0 h-2 bg-gray-300 opacity-70 rounded"></div>
        
        {/* Vertical Streets */}
        <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-gray-300 opacity-70 rounded"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gray-300 opacity-70 rounded"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-2 bg-gray-300 opacity-70 rounded"></div>
      </div>

      {/* Landmarks */}
      <div className="absolute top-10 left-10 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow">
        Hospital
      </div>
      <div className="absolute bottom-20 right-20 bg-green-600 text-white text-xs px-2 py-1 rounded shadow">
        Clinic
      </div>
      <div className="absolute top-20 right-30 bg-purple-600 text-white text-xs px-2 py-1 rounded shadow">
        Pharmacy
      </div>
    </div>
  );
};

export default MapBackground;

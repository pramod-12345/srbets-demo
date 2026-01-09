import React, { useState } from 'react';

const NumberSelector = () => {
  const [selected, setSelected] = useState({});
  const [date, setDate] = useState('2025-05-19');
  const [status, setStatus] = useState('OPEN');

  const handleInputChange = (index, value) => {
    setSelected((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    const formatted = Object.entries(selected).map(([key, value]) => {
      const paddedKey = key.toString();
      const paddedValue = value.toString();
      return paddedKey + paddedValue;
    });
  
    console.log('Formatted values:', formatted); // e.g., ["0202"]
  };

  return (
    <div className="">
      <div className="p-6 rounded-lg shadow-md w-full max-w-sm">
        {/* Date and Dropdown */}
        <div className="flex justify-between mb-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border outline-none rounded px-3 py-2 text-sm w-[48%]"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded px-3 py-2 text-sm w-[48%]"
          >
            <option>OPEN</option>
            <option>CLOSED</option>
          </select>
        </div>

        {/* Grid of numbers with inputs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="flex items-center border rounded overflow-hidden"
            >
              <div className="bg-teal-700 text-white px-5 text-center py-2 font-semibold">
                {i}
              </div>
              <input
                type="text"
                className="flex-1 px-2 py-2 outline-none"
                value={selected[i] || ''}
                onChange={(e) => handleInputChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-teal-700 text-white py-2 rounded hover:bg-teal-800 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NumberSelector;

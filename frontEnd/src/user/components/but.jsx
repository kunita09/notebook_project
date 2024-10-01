import React from 'react';

function but() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <button
                type="button"
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
            >
                ปุ่มทดสอบ
            </button>
        </div>
    );
}

export default but;

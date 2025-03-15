export default function ClaimForm() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">Submit a Claim</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name:</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email:</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Claim Amount:</label>
            <input 
              type="number" 
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Description:</label>
            <textarea 
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none resize-none"
              rows="3"
              placeholder="Describe your claim"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Upload Document:</label>
            <input 
              type="file" 
              className="w-full mt-1 file:px-4 file:py-2 file:border-0 file:bg-blue-500 file:text-white file:rounded-lg file:cursor-pointer file:shadow-md hover:file:bg-blue-600 transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all font-semibold"
          >
            Submit Claim
          </button>
        </form>
      </div>
    </div>
  );
}

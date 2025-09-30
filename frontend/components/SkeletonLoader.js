// components/SkeletonLoader.js
const SkeletonLoader = ({ type = 'card' }) => {
  switch (type) {
    case 'card':
      return (
        <div className="card p-6 skeleton">
          <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-300 rounded mb-4 w-5/6"></div>
          <div className="flex justify-between">
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-16 bg-gray-300 rounded"></div>
              <div className="h-8 w-16 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      );
    case 'form':
      return (
        <div className="space-y-6">
          <div className="h-10 bg-gray-300 rounded skeleton"></div>
          <div className="h-10 bg-gray-300 rounded skeleton"></div>
          <div className="h-32 bg-gray-300 rounded skeleton"></div>
          <div className="h-10 bg-gray-300 rounded skeleton"></div>
          <div className="flex justify-end space-x-3 pt-4">
            <div className="h-10 w-24 bg-gray-300 rounded skeleton"></div>
            <div className="h-10 w-32 bg-gray-300 rounded skeleton"></div>
          </div>
        </div>
      );
    case 'table-row':
      return (
        <tr>
          <td className="px-6 py-4 whitespace-nowrap skeleton">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap skeleton">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </td>
          <td className="px-6 py-4 skeleton">
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap skeleton">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap skeleton">
            <div className="h-8 w-20 bg-gray-300 rounded"></div>
          </td>
        </tr>
      );
    default:
      return (
        <div className="h-4 bg-gray-300 rounded skeleton"></div>
      );
  }
};

export default SkeletonLoader;
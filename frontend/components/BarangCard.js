// components/BarangCard.js
import Link from 'next/link';

const BarangCard = ({ item, onEdit, onDelete, userRole }) => {
  const handleDelete = () => {
    if (window.confirm('🗑️ Apakah Anda yakin ingin menghapus barang ini?\n\nData yang dihapus tidak dapat dikembalikan.')) {
      onDelete(item.id);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(item.id);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(parseFloat(price));
  };

  const getStockStatus = (stok) => {
    if (stok === 0) return { color: 'bg-red-100 text-red-700', text: 'Habis' };
    if (stok < 10) return { color: 'bg-yellow-100 text-yellow-700', text: `Stok: ${stok}` };
    return { color: 'bg-emerald-100 text-emerald-700', text: `Stok: ${stok}` };
  };

  const stockStatus = getStockStatus(item.stok);

  return (
    <div className="card-gradient shadow-modern hover:shadow-modern-xl transition-all duration-300 transform hover:-translate-y-2 group w-full">
      {/* Image Section */}
      {item.image_url && (
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${item.image_url}`}
            alt={item.nama}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="p-4 sm:p-6">
        {/* Header dengan stock badge */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
              {item.nama}
            </h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed line-clamp-2">
              {item.deskripsi || 'Tidak ada deskripsi'}
            </p>
          </div>
          <div className={`${stockStatus.color} px-3 py-1 rounded-full text-xs font-bold self-start sm:ml-3`}>
            {stockStatus.text}
          </div>
        </div>
        
        {/* Price */}
        <div className="mb-4 sm:mb-6">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            {formatPrice(item.harga)}
          </div>
          <div className="text-sm text-gray-500">
            Per unit
          </div>
        </div>
        
        {/* Actions */}
        {/* Actions - Only show for admin */}
        {userRole === 'admin' && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button 
              onClick={handleEdit}
              className="btn btn-outline btn-sm flex items-center justify-center hover:scale-105 transition-transform"
            >
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button 
              onClick={handleDelete}
              className="btn btn-danger btn-sm flex items-center justify-center hover:scale-105 transition-transform"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Hapus
            </button>
          </div>
        )}
      </div>
      
      {/* Hover indicator */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export default BarangCard;
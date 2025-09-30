// components/BarangForm.js
import { useState } from 'react';

const BarangForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nama: initialData?.nama || '',
    harga: initialData?.harga || '',
    deskripsi: initialData?.deskripsi || '',
    stok: initialData?.stok || 0
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Hapus error saat user mulai mengetik
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama barang wajib diisi';
    }
    
    if (!formData.harga || parseFloat(formData.harga) <= 0) {
      newErrors.harga = 'Harga harus lebih dari 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        harga: parseFloat(formData.harga),
        stok: parseInt(formData.stok) || 0
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-group">
        <label htmlFor="nama" className="form-label">Nama Barang *</label>
        <input
          type="text"
          id="nama"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          className={`form-input ${errors.nama ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
          placeholder="Masukkan nama barang"
        />
        {errors.nama && <p className="form-error">{errors.nama}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="harga" className="form-label">Harga Barang * (Rp)</label>
        <input
          type="number"
          id="harga"
          name="harga"
          value={formData.harga}
          onChange={handleChange}
          min="0"
          step="1000"
          className={`form-input ${errors.harga ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
          placeholder="0"
        />
        {errors.harga && <p className="form-error">{errors.harga}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          value={formData.deskripsi}
          onChange={handleChange}
          rows="4"
          className="form-input"
          placeholder="Deskripsi barang (opsional)"
        />
      </div>

      <div className="form-group">
        <label htmlFor="stok" className="form-label">Stok</label>
        <input
          type="number"
          id="stok"
          name="stok"
          value={formData.stok}
          onChange={handleChange}
          min="0"
          className="form-input"
          placeholder="0"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
        >
          Batal
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {initialData ? 'Simpan Perubahan' : 'Tambah Barang'}
        </button>
      </div>
    </form>
  );
};

export default BarangForm;
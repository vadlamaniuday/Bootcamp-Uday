import React from 'react';

 function PageSizeSelector({ pageSize, onPageSizeChange }) {
  const pageSizeOptions = [20, 50, 100];

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="pageSize" className="text-sm font-medium text-gray-700">
        Papers per page:
      </label>
      <select
        id="pageSize"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="rounded border p-1"
      >
        {pageSizeOptions.map(size => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}


export default PageSizeSelector
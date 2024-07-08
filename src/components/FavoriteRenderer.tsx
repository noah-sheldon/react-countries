import React from 'react';

const FavoriteRenderer = (params: any) => {
  const data = params.data;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    data.favorite = isChecked;

    const favoriteCountries = JSON.parse(
      localStorage.getItem('favoriteCountries') || '[]'
    );
    if (favoriteCountries.includes(data.name) === false && isChecked) {
      favoriteCountries.push(data.name);
    } else {
      const index = favoriteCountries.indexOf(data.name);
      if (index > -1) {
        favoriteCountries.splice(index, 1);
      }
    }
    localStorage.setItem(
      'favoriteCountries',
      JSON.stringify(favoriteCountries)
    );
    params.api.refreshCells({
      rowNodes: [params.node],
    });
  };

  return (
    <input
      type="checkbox"
      checked={data.favorite}
      onChange={handleCheckboxChange}
    />
  );
};

export default FavoriteRenderer;

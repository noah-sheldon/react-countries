/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import parseCountriesData from '../stores/countriesStore';
import { ColDef, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Countries } from '../types/countries';
import FavoriteRenderer from './FavoriteRenderer';

const TableComponent: React.FC = () => {
  const [countries, SetCountries] = useState<Countries[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<Countries | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await parseCountriesData();
        SetCountries(data);
      } catch (error) {
        console.error(`Couldn't fetch countries ${error}`);
      }
    };
    fetchData();
  }, []);

  const columnDefs: ColDef[] = [
    {
      headerName: 'Favorite',
      field: 'favorite',
      cellRenderer: FavoriteRenderer,
      editable: true,
    },
    {
      headerName: 'Flag',
      field: 'flag',
      cellRenderer: (params: any) => {
        const flagUrl = params.data.flag;
        return flagUrl ? (
          <img src={flagUrl} alt="Flag" style={{ width: 30, height: 20 }} />
        ) : null;
      },
    },
    { headerName: 'Country Name', field: 'name' },
    {
      headerName: 'Currency Code',
      valueGetter: (params) =>
        params.data.currencyCode ? params.data.currencyCode.join(', ') : 'N/A',
    },
    {
      headerName: 'Currency',
      valueGetter: (params) =>
        params.data.currencies ? params.data.currencies.join(', ') : 'N/A',
    },
    {
      headerName: 'Languages',
      valueGetter: (params) =>
        params.data.languages ? params.data.languages.join(', ') : 'N/A',
    },
    {
      headerName: 'Capital',
      field: 'capital',
    },
    {
      headerName: 'Population',
      field: 'population',
    },
  ];

  const gridOptions: GridOptions = {
    defaultColDef: {
      flex: 1,
      minWidth: 100,
      sortable: true,
      filter: true,
    },
    pagination: true,
    paginationPageSize: 15,
    onCellClicked: (event) => {
      if (event.column.getColDef().field !== 'favorite') {
        setSelectedCountry(event.data);
      }
    },
    suppressHorizontalScroll: true,
    domLayout: 'autoHeight',
    onGridReady: (params: any) => {
      params.api?.sizeColumnsToFit();
    },
    animateRows: true,
    suppressPaginationPanel: false,
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const renderDetailsCard = () => {
    if (!selectedCountry) {
      return null;
    }

    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">{selectedCountry.name}</h2>
        <p>
          <strong>Capital:</strong> {selectedCountry.capital || 'N/A'}
        </p>
        <p>
          <strong>Population:</strong> {selectedCountry.population || 'N/A'}
        </p>
        <p>
          <strong>Languages:</strong>{' '}
          {selectedCountry.languages.join(', ') || 'N/A'}
        </p>
        <p>
          <strong>Currencies:</strong>{' '}
          {selectedCountry.currencies.join(', ') || 'N/A'}
        </p>
        <p>
          <strong>Flag:</strong>{' '}
          <img
            src={selectedCountry.flag}
            alt={`Flag of ${selectedCountry.name}`}
          />
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white"
          onClick={() => setSelectedCountry(null)}
        >
          Close
        </button>
      </div>
    );
  };

  return (
    <div className="container-md  flex-row justify-center align-middle items-center h-screen w-100">
      <div className="ag-theme-alpine">
        {!selectedCountry && (
          <>
            <input
              type="input"
              className="border border-gray rounded-lg px-4 m-10 align-middle justify-center"
              placeholder="Search..."
              onChange={handleSearch}
            />
            <AgGridReact
              rowData={countries}
              columnDefs={columnDefs}
              gridOptions={gridOptions}
              quickFilterText={search}
            />
          </>
        )}
        {selectedCountry && renderDetailsCard()}
      </div>
    </div>
  );
};

export default TableComponent;

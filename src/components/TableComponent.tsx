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
        const flagUrl = params.data.flag; // Adjust according to your data structure
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
    },
    suppressHorizontalScroll: true,
    domLayout: 'autoHeight',
    onGridReady: (params: any) => {
      params.api?.sizeColumnsToFit();
    },
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container-md  flex-row justify-center align-middle items-center h-screen w-100">
      <input
        type="input"
        className="border border-gray rounded-lg px-4 m-10 align-middle justify-center"
        placeholder="Search..."
        onChange={handleSearch}
      />
      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={countries}
          columnDefs={columnDefs}
          gridOptions={gridOptions}
          quickFilterText={search}
        />
      </div>
    </div>
  );
};

export default TableComponent;

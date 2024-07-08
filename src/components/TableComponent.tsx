/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import parseCountriesData from '../stores/countriesStore';
import { ColDef, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Countries } from '../types/countries';
import FavoriteRenderer from './FavoriteRenderer';
import CardComponent from './CardComponent';

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

  return (
    <div className="container mx-auto p-4">
      <div className="ag-theme-alpine shadow-lg rounded-lg overflow-hidden">
        {!selectedCountry && (
          <>
            <input
              type="input"
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
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
        <CardComponent
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      </div>
    </div>
  );
};

export default TableComponent;

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import parseCountriesData from "../stores/countriesStore";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Countries } from "../types/countries";
import { GridOptions } from "ag-grid-community";

export const TableComponent: React.FC = () => {
  const [countries, SetCountries] = useState<Countries[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await parseCountriesData();
        SetCountries(data);
      } catch (error) {
        console.log(`Couldn't fetch countries ${error}`);
      }
    };
    fetchData();
  }, []);

  const columnDefs: ColDef[] = [
    {
      headerName: "Flag",
      field: "flag",
      cellRenderer: (params: any) => {
        const flagUrl = params.data.flag; // Adjust according to your data structure
        return flagUrl ? (
          <img src={flagUrl} alt="Flag" style={{ width: 30, height: 20 }} />
        ) : null;
      },
    },
    { headerName: "Country Name", field: "name" },
    {
      headerName: "Currency Code",
      valueGetter: (params) =>
        params.data.currencyCode ? params.data.currencyCode.join(", ") : "N/A",
    },
    {
      headerName: "Currency",
      valueGetter: (params) =>
        params.data.currencies ? params.data.currencies.join(", ") : "N/A",
    },
    {
      headerName: "Languages",
      valueGetter: (params) =>
        params.data.languages ? params.data.languages.join(", ") : "N/A",
    },
    {
      headerName: "Capital",
      field: "capital",
    },
    {
      headerName: "Population",
      field: "population",
    },
  ];

  const gridOptions: GridOptions = {
    defaultColDef: {
      flex: 1,
      minWidth: 100,
    },
    suppressHorizontalScroll: true,
    domLayout: "autoHeight",
    onGridReady: (params: any) => {
      params.api?.sizeColumnsToFit();
    },
  };

  return (
    <div className="container my-auto ">
      {/* <div className="search-box h-20 align-middle">
        <span>Search:</span>
        <input type="text" id="filter-text-box" placeholder="Filter..." />
      </div> */}
      <div className="ag-theme-alpine" style={{ width: "100%" }}>
        <AgGridReact
          rowData={countries}
          columnDefs={columnDefs}
          gridOptions={gridOptions}
        />
      </div>
    </div>
  );
};

export default TableComponent;

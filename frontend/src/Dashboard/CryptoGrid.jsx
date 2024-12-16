// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import ReactECharts from 'echarts-for-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { signOut } from "supertokens-auth-react/recipe/session";
import ThresholdModal from './ThresholdModal';
import { monitorCoinPrices } from './emailHelper';
import { useNavigate } from 'react-router-dom';



const CryptoGrid = ({logOut}) => {

  const [cryptoData, setCryptoData] = useState([]);
  const [chartData, setChartData] = useState({});

  const [modalOpen, setModalOpen] = useState(false);//
  const [thresholds, setThresholds] = useState({}); 
  const [selectedCoin, setSelectedCoin] = useState(null);

  const navigate = useNavigate();

  ModuleRegistry.registerModules([AllCommunityModule]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleAlertClick = (params) => {
    setSelectedCoin(params.data);
    setModalOpen(true);
  };

  const handleThresholdConfirm = (coin, threshold) => {

    setThresholds((prevState) => ({
      ...prevState,
      [coin.name]: threshold, // Store the threshold for this specific coin
    }));
  };


  
  const handleLogout = () => {
    logOut();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
      const data = response.data.coins.map((coin) => ({
        name: coin.item.name,
        symbol: coin.item.symbol,
        price_btc: coin.item.price_btc,
      }));
      if (!data) {
        alert("No data available");
      }
      setCryptoData(data);

      setChartData({
        xAxis: {
          type: 'value',
        },
        yAxis: {

          type: 'category',
          data: data.map((coin) => coin.name),
          axisLabel: {
            interval: 0, // Ensure every label is shown
            margin: 20, // Increase the margin between labels and the axis
          },
        },
        series: [
          {
            data: data.map((coin) => coin.price_btc),
            type: 'bar',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (cryptoData.length > 0) {
      monitorCoinPrices(cryptoData, thresholds);
    }
  }, [cryptoData, thresholds]);

  const columnDefs = [
    { headerName: 'Name', field: 'name', sortable: true, filter: true, flex: 1 },
    { headerName: 'Symbol', field: 'symbol', sortable: true, filter: true, flex: 1 },
    { headerName: 'Price (BTC)', field: 'price_btc', sortable: true, filter: true, flex: 1 },
    {
      headerName: 'Alert',
      flex: 1,
      width: 150,
      cellRenderer: (params) => {
        return (
          <button className="btn btn-sm btn-warning" onClick={() => handleAlertClick(params)}>Set Alert</button>
        );
      }
    }
  ];



  return (
    <>


      <div class="container mt-5 text-center">
          <div class="row">
            <div className="ag-theme-alpine" style={{ width: '100%' }}>
          <AgGridReact
            rowData={cryptoData}
            columnDefs={columnDefs}
            domLayout='autoHeight'
            pagination={true}
            paginationPageSize={10}
            frameworkComponents={{
              alertButton: (params) => (
                <button className="btn btn-warning" onClick={() => handleAlertClick(params)}>Set Alert</button>
              )
            }}
          />
        </div>
          </div>
          <div class="row">
            <div className="col-10 justify-content-center">
              <ReactECharts option={chartData} style={{ height: 700, width: '100%' }} />
            </div>
          </div>
      </div>



        <ThresholdModal
          isOpen={modalOpen}
          toggle={toggleModal}
          coin={selectedCoin}
          onConfirm={handleThresholdConfirm}
        />
      
    </>
  );
};

export default CryptoGrid;
import './AccessLog.css';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { getAccessLog } from '../services/AccessLogService';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { Link } from 'react-router-dom';
import CustomDialog from '../components/CustomDialog';

function AccessLog() {
  const [accessLog, setAccessLog] = useState(null);
  const [trackingCode, setTrackingCode] = useState('');
  const [ip_addr, setIp_addr] = useState('');
  const [open, setOpen] = React.useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'ip_addr', headerName: 'IP address', width: 200,
      renderCell: (params) => (
        <Link href="#" onClick={() => handleClickOpen(params.value)} style={{ textDecoration: 'none', color: 'inherit' }}>
          {params.value}
        </Link>
      ),
    },
    { field: 'access_time', headerName: 'Access Time', width: 200 },
  ];

  const handleTrackingCodeChange = (event) => {
    setTrackingCode(event.target.value);
  };

  const fetchData = async () => {
    const response = await getAccessLog(trackingCode);
    const json = await response.json();
    setAccessLog(json);
  };

  const SearchButtonClick = () => {
    fetchData();
  };

  const handleClickOpen = (ip_addr) => {
    setIp_addr(ip_addr);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="AccessLog">
      <h1>IP Logger</h1>
      <TextField
        label="Tracking Code"
        value={trackingCode}
        onChange={handleTrackingCodeChange}
        variant="standard"
        sx={{ width: '300px' }}
        InputProps={{
          endAdornment: (
            <IconButton onClick={SearchButtonClick}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <p>
        Tracking Code: <span style={{ color: 'red' }}>{trackingCode}</span>
      </p>
      <div className="DataGridContainer">
        {accessLog ? (
          <DataGrid
            rows={accessLog}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        ) : (
          <div>Please input a tracking code to get the access record.</div>
        )}
      </div>

      <CustomDialog open={open} handleClose={handleClose} ip_addr={ip_addr} />
    </div>
  );
}

export default AccessLog;
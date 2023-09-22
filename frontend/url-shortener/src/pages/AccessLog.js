import './AccessLog.css';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { getAccessLog } from '../services/AccessLogService';

function AccessLog() {
    const [accessLog, setAccessLog] = useState(null);
    const [trackingCode, setTrackingCode] = useState('');

    const fetchData = async () => {
        const response = await getAccessLog(trackingCode);
        const json = await response.json();
        setAccessLog(json);
    };

    const handleTrackingCodeChange = (event) => {
        setTrackingCode(event.target.value);
    };

    const SearchButtonClick = () => {
        fetchData();
    };
    
    const SearchButton = () => (
        <IconButton onClick={SearchButtonClick}>
            <SearchIcon />
        </IconButton>
    )

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'ip_addr', headerName: 'IP address', width: 200 },
        { field: 'access_time', headerName: 'Access Time', width: 200 },
    ];

    return (
        <div className="AccessLog">
            <h1>IP Logger</h1>
            <TextField label="Tracking Code" value={trackingCode} onChange={handleTrackingCodeChange} variant="standard" sx={{width: "300px"}} InputProps={{endAdornment: <SearchButton />}}/>
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
        </div>
    );
}

export default AccessLog;
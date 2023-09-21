import logo from './../logo.svg';
import './AccessLog.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAccessLog } from '../services/AccessLogService';
import { DataGrid } from '@mui/x-data-grid';

function AccessLog() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const trackingCode = searchParams.get('code');
    const [accessLog, setAccessLog] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAccessLog(trackingCode);
            const json = await response.json();
            setAccessLog(json);
        };

        fetchData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'ip_addr', headerName: 'IP address', width: 200 },
        { field: 'access_time', headerName: 'Access Time', width: 200 },
    ];

    return (
        <div className="AccessLog">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>IP Logger</h1>
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
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
}

export default AccessLog;
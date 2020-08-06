import React from 'react';

import {BrowserRouter as Router} from 'react-router-dom';

import {ConfigProvider} from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';

import {ApiContext} from 'api/useApi';
import {RegionsApi} from 'api/RegionsApi';
import config from 'config.json';

import {Root} from 'components/Root';

const api = new RegionsApi(config.api);

const App: React.FC = () => {
    return (
        <ApiContext.Provider value={api}>
            <ConfigProvider locale={ruRU}>
                <Router>
                    <Root />
                </Router>
            </ConfigProvider>
        </ApiContext.Provider>
    );
};

export default App;

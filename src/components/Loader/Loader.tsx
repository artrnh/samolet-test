import React from 'react';

import {Spin} from 'antd';

import './index.css';

const Loader: React.FC = (props) => {
    return (
        <div className="wrapper">
            <Spin size="large" />
        </div>
    );
};

export {Loader};

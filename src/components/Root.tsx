import React, {useEffect, useState} from 'react';

import {Route, Switch, Redirect, Link} from 'react-router-dom';

import {Layout, Row, Col} from 'antd';

import * as routes from 'constants/routes';
import {RegionsList} from 'screens/RegionsList';
import {RegionInfo} from 'screens/RegionInfo';

import {useApi} from 'api/useApi';
import {Region} from 'api/types/Region';

import {Loader} from 'components/Loader';

import 'antd/dist/antd.css';
import './root.css';

const {Header, Content} = Layout;

const Root: React.FC = (props) => {
    const api = useApi();

    const [regions, setRegions] = useState<Region[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                setLoading(true);
                setError(false);

                const regions = await api?.getLibraries();

                if (regions) {
                    setRegions(regions);
                    setLoading(false);
                }
            } catch (error) {
                setError(true);
            }
        };

        fetchRegions();
    }, [api, setLoading, setError]);

    if (error) return <div>Упс! Произошла ошибка.</div>;

    const filteredRegions = regions
        .filter((region) => region.territory.toLowerCase().includes(search.toLowerCase()))
        .map((region) => ({key: region.order, ...region}));

    const content = (
        <Switch>
            <Route path={routes.REGIONS_LIST} exact>
                <RegionsList regions={filteredRegions} onSearch={setSearch} />
            </Route>

            <Route path={routes.REGION_INFO} exact>
                <RegionInfo regions={regions} />
            </Route>

            <Redirect from="/" to={routes.REGIONS_LIST} />
        </Switch>
    );

    return (
        <Layout className="layout">
            <Header>
                <Link to={routes.REGIONS_LIST}>Статистика библиотек по регионам</Link>
            </Header>

            <Content className="content">
                <Row>
                    <Col span={16} offset={4}>
                        {loading ? <Loader /> : content}
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export {Root};

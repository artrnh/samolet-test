import React, {useCallback} from 'react';

import {Link} from 'react-router-dom';
import {Table, Input, Row, Col} from 'antd';
import {ColumnsType} from 'antd/es/table';

import {Region} from 'api/types/Region';

import * as routes from 'constants/routes';

interface Props {
    regions: Region[];
    onSearch(value: string): void;
}

const RegionsList: React.FC<Props> = (props) => {
    const {regions, onSearch} = props;

    const columns: ColumnsType<Region> = [
        {
            title: 'Регион',
            dataIndex: 'territory',
            key: 'territory',
            render: (text, record) => (
                <Link to={`${routes.REGIONS_LIST}/${record.order}`}>{text}</Link>
            )
        },
        {
            title: 'Кол-во библиотек',
            dataIndex: 'libraries',
            key: 'libraries',
            sorter: (a, b) => a.libraries - b.libraries,
            sortDirections: ['ascend', 'descend']
        }
    ];

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value),
        [onSearch]
    );

    return (
        <Row gutter={[0, 8]}>
            <Col span={24}>
                <Input.Search placeholder="Поиск по региону" onChange={handleChange} allowClear />
            </Col>

            <Col span={24}>
                <Table<Region> columns={columns} dataSource={regions} />
            </Col>
        </Row>
    );
};

export {RegionsList};

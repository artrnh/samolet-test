import React from 'react';

import {useParams, Link} from 'react-router-dom';
import {List, Space} from 'antd';

import {Region} from 'api/types/Region';

interface Props {
    regions: Region[];
}

const RegionInfo: React.FC<Props> = (props) => {
    const {regions} = props;

    const {id} = useParams();

    const current = regions.find((region) => +id === region.order);

    if (!current) return <div>Не найдено!</div>;

    const listData = [
        `Полное наименование: ${current.fullname}`,
        `Адрес: ${current.address}`,
        `Кол-во посетителей: ${current.visits}`,
        `Кол-во компьютеров: ${current.computers}`,
        `Кол-во посетителей сайта: ${current.visitsSites}`,
        `Кол-во сотрудников: ${current.employees}`
    ];

    return (
        <Space direction="vertical">
            <Link to="/">Назад</Link>

            <List
                size="large"
                bordered
                dataSource={listData}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </Space>
    );
};

export {RegionInfo};

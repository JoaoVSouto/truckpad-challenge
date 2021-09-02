import { Table, Space, Button, Tooltip, Popconfirm, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';

import * as S from './styles';

const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Tipo de CNH',
    dataIndex: 'CNHType',
    key: 'CNHType',
  },
  {
    title: 'Estado',
    dataIndex: 'state',
    key: 'state',
    responsive: ['sm'] as Breakpoint[],
  },
  {
    title: 'Cidade',
    dataIndex: 'city',
    key: 'city',
    responsive: ['sm'] as Breakpoint[],
  },
  {
    title: 'Idade',
    dataIndex: 'age',
    key: 'age',
    responsive: ['sm'] as Breakpoint[],
  },
  {
    title: 'Ações',
    key: 'action',
    render: () => (
      <Space size="small">
        <Tooltip title="Editar">
          <Button type="primary" shape="circle" icon={<EditOutlined />} />
        </Tooltip>
        <Popconfirm
          title="Confirma remoção?"
          cancelText="Cancelar"
          placement="right"
        >
          <Tooltip title="Remover">
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              danger
            />
          </Tooltip>
        </Popconfirm>
      </Space>
    ),
  },
];

const data = [
  {
    name: 'Pouca Tripa',
    age: 32,
    state: 'São Paulo',
    city: 'São Paulo',
    CNHType: 'A',
  },
];

export function Home() {
  return (
    <S.Container>
      <S.Header>
        <Typography.Title level={2}>
          Gerenciamento de motoristas
        </Typography.Title>

        <Button type="primary" icon={<PlusOutlined />}>
          Novo motorista
        </Button>
      </S.Header>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          position: ['bottomCenter'],
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
      />
    </S.Container>
  );
}

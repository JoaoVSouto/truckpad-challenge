import * as React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Table,
  Space,
  Button,
  Tooltip,
  Popconfirm,
  Typography,
  Spin,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';
import { differenceInYears } from 'date-fns';

import { DriverStore, DriverData } from 'store/driver';

import { DriverConfigModal } from 'components/DriverConfigModal';

import * as S from './styles';

type HomeProps = {
  driver: DriverStore;
};

export const Home = observer<HomeProps>(({ driver }) => {
  const [isDriverConfigModalVisible, setIsDriverConfigModalVisible] =
    React.useState(false);
  const [isFirstRender, setIsFirstRender] = React.useState(true);

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
      render: (_: unknown, record: DriverData) => (
        <Space size="small">
          <Tooltip title="Editar">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
          </Tooltip>
          <Popconfirm
            title="Confirma remoção?"
            cancelText="Cancelar"
            placement="right"
            onConfirm={() => driver.deleteDriver(record.id)}
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

  const driversViews = driver.data.map(currentDriver => ({
    ...currentDriver,
    key: currentDriver.id,
    CNHType: currentDriver.cnh ? currentDriver.cnh.category : '-',
    state: currentDriver.address.state,
    city: currentDriver.address.city,
    age: differenceInYears(new Date(), new Date(currentDriver.birthDate)),
  }));

  React.useEffect(() => {
    if (isFirstRender) {
      driver.fetchDrivers();
    } else {
      setIsFirstRender(false);
    }
  }, [driver, isFirstRender]);

  function handleDriverConfigModalOpen() {
    setIsDriverConfigModalVisible(true);
  }

  function handleDriverConfigModalClose() {
    setIsDriverConfigModalVisible(false);
  }

  return (
    <S.Container>
      <S.Header>
        <S.TitleContainer>
          <Typography.Title level={2}>
            Gerenciamento de motoristas
          </Typography.Title>
          {driver.isFetchingSilently && (
            <Spin indicator={<LoadingOutlined />} />
          )}
        </S.TitleContainer>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleDriverConfigModalOpen}
        >
          Novo motorista
        </Button>
      </S.Header>
      <Table
        columns={columns}
        locale={{ emptyText: 'Nenhum motorista encontrado' }}
        loading={driver.isFetching}
        dataSource={driversViews}
        pagination={{
          current: driver.page,
          total: driver.total,
          pageSize: driver.limitPerPage,
          position: ['bottomCenter'],
          showSizeChanger: true,
          disabled: driver.isFetching,
          pageSizeOptions: ['5', '10', '15', '20'],
          onChange: (page, pageSize) => driver.changePage(page, pageSize),
        }}
      />

      <DriverConfigModal
        visible={isDriverConfigModalVisible}
        onRequestClose={handleDriverConfigModalClose}
        createDriver={driver.createDriver}
        isCreating={driver.isCreating}
      />
    </S.Container>
  );
});

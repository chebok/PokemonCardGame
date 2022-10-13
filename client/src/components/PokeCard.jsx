import React, { useState } from 'react';
import { Card, Tooltip, Modal } from 'antd';
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
// const { Meta } = Card;

const PokeCard = ({ pokemon = {} }) => {
  const { image, name, legend, isDeck } = pokemon;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('Adding Pokemon to the deck...');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleOkIsDeck = () => {
    setModalText('Removing Pokemon from the deck...');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={name}>
        <Card
          hoverable
          style={{
            maxWidth: 160,
            maxHeight: 160,
            marginBottom: 15,
            marginTop: 15,
          }}
          cover={
            <img
              alt="example"
              src={image}
              style={{ width: "150px" }}
            />
          }
          onClick={showModal}
        // actions={[
        //   <SettingOutlined key="setting" />,
        //   <EditOutlined key="edit" />,
        //   <EllipsisOutlined key="ellipsis" />,
        // ]}
        >
          {/* <Meta
        title={name}
        description={legend}
      /> */}
        </Card>
      </Tooltip>
      <Modal
        title={name}
        open={open}
        onOk={isDeck ? handleOkIsDeck : handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {confirmLoading ?
          <p>{modalText}</p>
          : <div>
            <img
              alt="example"
              src={image}
              style={{ width: "150px" }}
            />
            <p>{legend}</p>
            <br />
            <p
              style={{
                textAlign: 'right',
              }}
            >
              {isDeck ? 'Remove this Pokemon from your deck?' : 'Add this Pokemon to your deck?'}
            </p>
          </div>
        }
      </Modal>
    </>
  );
}


export default PokeCard;

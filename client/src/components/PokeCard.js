import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;


const PokeCard = ({ image, name, legend }) => (
  <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src={image}
        style={{width:"150px"}}
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      title={name}
      description={legend}
    />
  </Card>
);

export default PokeCard;

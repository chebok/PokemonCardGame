import { Card, Tooltip } from 'antd';
import questionMark from '../mock/images/questionMark.jpeg';

const PokeCardUnknown = () => {
  return (
    <>
      <Tooltip title='Play to unlock'>
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
              alt="unknkownPokeCard"
              src={questionMark}
              style={{ width: "150px" }}
            />
          }
          // onClick={showModal}
        >
        </Card>
      </Tooltip>
    </>
  );
}


export default PokeCardUnknown;

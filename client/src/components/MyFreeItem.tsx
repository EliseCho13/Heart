import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MiniTag from './MiniTag';

const ItemWrapper = styled.div`
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  color: white;
  width: 30rem;
  border-radius: 10px;
  padding: 1.2rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  > div:first-child {
    text-shadow: white 0 0 0.3rem;
    width: 27rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
  > div {
    margin: 0.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    > div {
      display: flex;
      flex-direction: row;
      font-size: 0.8rem;
    }
    #quota {
      margin-right: 0.6rem;
    }
    #tagContainer {
      width: 15rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-direction: row;
      height: 1rem;
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const ItemContainer = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  i {
    font-size: 24px;
    margin-left: 40px;
    color: white;
    &:hover {
      color: var(--neon-red);
      text-shadow: white 0 0 3px;
    }
  }
`;
interface Item {
  title: string;
  quota: string;
  tags: { tagId: number; tagName: string }[];
  id: number;
}

const MyFreeItem = ({ title, quota, tags, id }: Item) => (
  <div>
    <ItemContainer to={`/freeboard/${id}`}>
      <ItemWrapper>
        <div>{title}</div>
        <div>
          <div>
            <span id="quota">{quota}</span>
          </div>
          <div id="tagContainer">
            {tags.map((e) => (
              <MiniTag key={e.tagId} tagName={e.tagName} />
            ))}
          </div>
        </div>
      </ItemWrapper>
    </ItemContainer>
  </div>
);

export default MyFreeItem;

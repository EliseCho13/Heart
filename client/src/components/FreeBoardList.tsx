/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CreatorMiniCard from './CreatorMiniCard';
import TagLink from './TagLink';
import timeDifference from '../utils/timeDifference';

interface FreeBoardListProps {
  setTypeState: React.Dispatch<React.SetStateAction<string>>;
  setKeywordState: React.Dispatch<React.SetStateAction<string>>;
  data: {
    freeId: number;
    category: string;
    freeBody: string;
    freeTitle: string;
    modifiedAt: string;
    freeLikes: [];
    views: number;
    memberId: number;
    freeTags: { tagId: number; tagName: string }[];
    freeComments: {
      freeCommentId: number;
      freeId: number;
      commentBody: string;
      createdAt: string;
      modifiedAt: string;
      memberId: number;
      nickname: string;
      heart: number;
      body: string;
    }[];
    nickname: string;
    authorHeart: number;
    authorLocation: string;
    filePath: string;
    location: string;
  };
}

const Board = styled.li`
  width: 35rem;
  padding: 1rem;
  margin: 1rem;
  border: 0.05rem solid white;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
`;

const Category = styled('div')<{ color: string }>`
  width: 4.5rem;
  height: 2rem;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.color === '운동'
      ? 'var(--neon-blue)'
      : props.color === '정보'
      ? 'var(--neon-orange)'
      : props.color === '질문'
      ? 'var(--neon-green)'
      : 'var(--neon-sky-blue)'};
`;

const ContentSec = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 12rem;
  font-size: 16px;
  > div:first-child {
    display: flex;
    > a {
      border-radius: 1rem;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      div {
        width: 5.5rem;
        height: 2rem;
      }
    }
    > div:nth-child(2) {
      width: 17rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      margin-left: 0.3rem;
      margin-top: 0.3rem;
    }
  }

  > div:nth-child(2) {
    width: 26rem;
    height: auto;
    min-height: 1.5rem;
    max-height: 5rem;
    line-height: 150%;
    padding: 0.2rem;
    margin: 0.5rem 0;
  }

  div:nth-child(3) {
    display: flex;
    width: 21rem;
    margin-bottom: 0.2rem;
  }

  > div:last-child {
    width: auto;
    height: 1.5rem;
    display: flex;
    align-items: center;
    .location {
      margin-right: 0.5rem;
      display: flex;
      > i {
        margin-right: 0.3rem;
      }
    }
  }
`;

const AuthorSec = styled.section`
  display: flex;
  flex-direction: column;

  div {
    margin: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .like {
      color: var(--neon-yellow);
    }
    .view {
      color: var(--neon-blue);
    }
    .comment {
      color: var(--neon-green);
    }
  }
  .counts {
    display: flex;
    flex-direction: column;
    div {
      i {
        margin-right: 0.3rem;
      }
    }
  }
`;

const FreeBoardList = ({
  setTypeState,
  setKeywordState,
  data,
}: FreeBoardListProps) => (
  <Link to={`/freeboard/${data.freeId}`}>
    <Board>
      <ContentSec>
        <div>
          <Link
            to={`/freeboards?type=category&keyword=${data.category}`}
            onClick={() => {
              setTypeState('category');
              setKeywordState(data.category);
            }}
          >
            <Category color={data.category}>
              {data.category === '운동' ? (
                <i className="fa-solid fa-dumbbell" />
              ) : data.category === '정보' ? (
                <i className="fa-solid fa-bullhorn" />
              ) : data.category === '질문' ? (
                <i className="fa-regular fa-comments" />
              ) : (
                <i className="fa-solid fa-hand-holding-heart" />
              )}
              {data.category}
            </Category>
          </Link>
          <div>{data.freeTitle}</div>
        </div>
        <div>{data.freeBody}</div>
        <div>
          {data.freeTags.map((el) => (
            <TagLink
              onClick={() => {
                setTypeState('tag');
                setKeywordState(el.tagName);
              }}
              key={el.tagId}
              value={`${el.tagName}`}
              to={`?type=tag&keyword=${el.tagName}`}
            />
          ))}
        </div>
        <div>
          {data.location ? (
            <div className="location">
              <i className="fa-solid fa-location-dot" />
              <div>{data.location}</div>
            </div>
          ) : (
            ''
          )}
          <div>{`${timeDifference(data.modifiedAt)}`}</div>
        </div>
      </ContentSec>
      <AuthorSec>
        <div className="counts">
          <div>
            <i className="fa-solid fa-eye view" />
            {data.views}
          </div>
          <div>
            <i className="fa-regular fa-thumbs-up like" />
            {data.freeLikes.length}
          </div>
          <div>
            <i className="fa-regular fa-comment-dots comment" />
            {data.freeComments.length}
          </div>
          <CreatorMiniCard
            memberId={data.memberId}
            nickname={data.nickname}
            heart={data.authorHeart}
            authorLocation={data.authorLocation}
            image={data.filePath}
          />
        </div>
      </AuthorSec>
    </Board>
  </Link>
);
export default FreeBoardList;

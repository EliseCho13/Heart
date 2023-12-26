import FreeDataProps from '../interfaces/FreeDataProps';
import MyFreeItem from './MyFreeItem';

const WroteFree = ({ data }: any) => (
  <div>
    {data.length === 0 ? (
      <div>글이 아직 없습니다</div>
    ) : (
      data.map((e: FreeDataProps) => (
        <MyFreeItem
          key={e.freeId}
          title={e.freeTitle}
          quota=""
          tags={e.freeTags}
          id={e.freeId}
        />
      ))
    )}
  </div>
);
export default WroteFree;

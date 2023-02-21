// import Chat from '@components/Chat';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import { DM, Chat } from '@typings/db';
import React, { useCallback, forwardRef, MutableRefObject, WheelEventHandler } from 'react';
// import { Scrollbars } from 'react-custom-scrollbars-2';
import { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';

interface Props {
  // chatSections: { [key: string]: (IDM | IChat)[] };
  // fetchNext: () => Promise<InfiniteQueryObserverResult>;
  // isReachingEnd: boolean;
  chatData: InfiniteData<DM[]>;
}
// const ChatList = forwardRef<Scrollbars, Props>(({ chatSections, fetchNext, isReachingEnd }, scrollRef) => {
const ChatList: React.FC<Props> = ({ chatData }) => {
  // const onScroll: WheelEventHandler = useCallback(
  //   (values) => {
  //     if (values.scrollTop === 0 && !isReachingEnd) {
  //       console.log('가장 위');
  //       fetchNext().then(() => {
  //         // 스크롤 위치 유지
  //         // const current = (scrollRef as MutableRefObject<Scrollbars>)?.current;
  //         // if (current) {
  //         //   current.scrollTop(current.getScrollHeight() - values.scrollHeight);
  //         // }
  //       });
  //     }
  //   },
  //   [scrollRef, isReachingEnd, fetchNext],
  // );

  return (
    <ChatZone>
      {/*<Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>*/}
      {/*  {Object.entries(chatSections).map(([date, chats]) => {*/}
      {/*    return (*/}
      {/*      <Section className={`section-${date}`} key={date}>*/}
      {/*        <StickyHeader>*/}
      {/*          <button>{date}</button>*/}
      {/*        </StickyHeader>*/}
      {/*        {chats.map((chat) => (*/}
      {/*          <Chat key={chat.id} data={chat} />*/}
      {/*        ))}*/}
      {/*      </Section>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</Scrollbars>*/}
      {chatData?.pages.map((chats, i) => {
        return chats?.map((chat) => <div>{chat.id}</div>);
      })}
    </ChatZone>
  );
};

export default ChatList;

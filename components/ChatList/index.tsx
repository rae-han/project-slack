// import Chat from '@components/Chat';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import { DM, Chat } from '@typings/db';
import React, { useCallback, forwardRef, MutableRefObject, WheelEventHandler } from 'react';
import { positionValues, Scrollbars } from 'react-custom-scrollbars-2';
import { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import ChatComp from '@components/Chat';

interface Props {
  chatSections: { [key: string]: (DM | Chat)[] };
  fetchNext: () => Promise<InfiniteQueryObserverResult>;
  isReachingEnd: boolean;
  chatData?: InfiniteData<DM[]>;
}
// const ChatList = forwardRef<Scrollbars, Props>(({ chatSections, fetchNext, isReachingEnd }, scrollRef) => {
// const ChatList: React.FC<Props> = ({ chatSections, chatData }) => {
const ChatList = forwardRef<Scrollbars, Props>(({ chatSections, fetchNext, isReachingEnd }, scrollRef) => {
  // const onScroll: WheelEventHandler = useCallback(
  const onScroll: (values: positionValues) => void = useCallback(
    (values) => {
      if (values.scrollTop === 0 && !isReachingEnd) {
        console.log('가장 위');
        // fetchNext().then(() => {
        //   console.log('success fetch Next');
        // });
        fetchNext().then(() => {
          // 스크롤 위치 유지
          const current = (scrollRef as MutableRefObject<Scrollbars>)?.current;
          if (current) {
            current.scrollTop(current.getScrollHeight() - values.scrollHeight);
          }
        });
      }
    },
    // [scrollRef, isReachingEnd, fetchNext],
    [isReachingEnd],
  );
  return (
    <ChatZone>
      <Scrollbars autoHide onScrollFrame={onScroll} ref={scrollRef}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <ChatComp key={chat.id} data={chat} />
              ))}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
});

export default ChatList;

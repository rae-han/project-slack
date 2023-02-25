import { DM, Chat } from '@typings/db';
import dayjs from 'dayjs';

export default function makeSection(chatList: (DM | Chat)[]) {
  const sections: { [key: string]: (DM | Chat)[] } = {};
  chatList.forEach((chat) => {
    const monthDate = dayjs(chat.createdAt).format('YYYY-MM-DD');
    if (Array.isArray(sections[monthDate])) {
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  });
  return sections;
}

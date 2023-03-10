// import useSocket from '@hooks/useSocket';
import { CollapseButton } from '@components/DMList/styles';
import { Channel, User } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC, useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import EachChannel from '@components/EachChannel';

const ChannelList: FC = () => {
  const { workspace } = useParams<{ workspace?: string }>();
  // const [socket] = useSocket(workspace);
  const { data: userData } = useQuery<User | false>(['user'], () => fetcher({ queryKey: '/api/users' }), {});
  const { data: channelData } = useQuery<Channel[]>(
    ['workspace', workspace, 'channel'],
    () => fetcher({ queryKey: `/api/workspaces/${workspace}/channels` }),
    {
      enabled: !!userData,
    },
  );
  const [channelCollapse, setChannelCollapse] = useState(false);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            aria-hidden="true"
          />
        </CollapseButton>
        <span>Channels</span>
      </h2>
      <div>
        {!channelCollapse &&
          channelData?.map((channel) => {
            // return (
            //   <NavLink
            //     key={channel.name}
            //     // activeClassName="selected"
            //     className="selected"
            //     to={`/workspace/${workspace}/channel/${channel.name}`}
            //   >
            //     <span># {channel.name}</span>
            //   </NavLink>
            // );
            return <EachChannel key={channel.id} channel={channel} />;
          })}
      </div>
    </>
  );
};

export default ChannelList;

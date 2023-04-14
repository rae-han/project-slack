import React, { useEffect } from 'react';
import { Channel, User } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router';
import { NavLink, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

interface Props {
  channel: Channel;
}
const EachChannel: React.FC<Props> = ({ channel }) => {
  const { workspace } = useParams<{ workspace?: string }>();
  const location = useLocation();
  // const { data: userData } = useSWR<User>('/api/users', fetcher, {
  //   dedupingInterval: 2000, // 2초
  // });
  const { data: userData } = useQuery<User>(['users'], () => fetcher({ queryKey: `/api/users` }));
  const date = localStorage.getItem(`${workspace}-${channel.name}`) || 0;
  // const { data: count, mutate } = useSWR<number>(
  //   userData ? `/api/workspaces/${workspace}/channels/${channel.name}/unreads?after=${date}` : null,
  //   fetcher,
  // );
  const { data: count } = useQuery<number>(
    ['count'],
    () => fetcher({ queryKey: `/api/workspaces/${workspace}/channels/${channel.name}/unreads?after=${date}` }),
    {
      enabled: !!userData,
    },
  );

  // useEffect(() => {
  //   if (location.pathname === `/workspace/${workspace}/channel/${channel.name}`) {
  //     mutate(0);
  //   }
  // }, [mutate, location.pathname, workspace, channel]);

  return (
    // <NavLink key={channel.name} activeClassName="selected" to={`/workspace/${workspace}/channel/${channel.name}`}>
    <NavLink key={channel.name} to={`/workspace/${workspace}/channel/${channel.name}`}>
      <span className={count !== undefined && count > 0 ? 'bold' : undefined}># {channel.name}</span>
      {count !== undefined && count > 0 && <span className="count">{count}</span>}
    </NavLink>
  );
};

export default EachChannel;

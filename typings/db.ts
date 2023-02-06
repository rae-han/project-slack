export interface User {
  id: number;
  nickname: string;
  email: string;
  // Workspaces: IWorkspace[];
}

export interface UserWithOnline extends User {
  online: boolean;
}

export interface Channel {
  id: number;
  name: string;
  private: boolean; // 비공개 채널 여부, 강좌에서는 모두 false(공개)
  WorkspaceId: number;
}

export interface IChat {
  // 채널의 채팅
  id: number;
  UserId: number;
  User: User; // 보낸 사람
  content: string;
  createdAt: Date;
  ChannelId: number;
  Channel: Channel;
}

export interface IDM {
  // DM 채팅
  id: number;
  SenderId: number; // 보낸 사람 아이디
  Sender: User;
  ReceiverId: number; // 받는 사람 아이디
  Receiver: User;
  content: string;
  createdAt: Date;
}

export interface IWorkspace {
  id: number;
  name: string;
  url: string; // 주소 창에 보이는 주소
  OwnerId: number; // 워크스페이스 만든 사람 아이디
}

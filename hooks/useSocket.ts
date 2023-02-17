import { io, Socket } from 'socket.io-client';
import { useCallback } from 'react';

const backUrl = 'http://localhost:3095';

const sockets: { [key: string]: SocketIOClient.Socket } = {};
const useSocket = (workspace?: string): [SocketIOClient.Socket | undefined, () => void] => {
  console.log('rerender useSocket', workspace);
  // // 소켓 통신 자체는 간단하다. emit으로 보내고 on으로 받고.
  // const socket = io.connect(`${backUrl}`);
  // socket.emit('hello', 'world'); // 서버에 hello 라는 이벤트 이름으로 world라는 데이터를 보낸다.
  //
  // socket.on('message', (data) => {
  //   // 서버에서 message 라는 이벤트가 오면 콜백 함수로 데이터를 받는다.
  //   console.log(data);
  // });
  //
  // // socket io 를 연결할 때 범위가 중요하다. 메세지를 받는 방이 정해져 있으면 거기만 가야지 다른 곳으로 가면 안된다 중요 메세지일수도 있기 때문에.
  // // slack의 workspace, channel 같은 계층이 있는 것처럼
  // // namespace와 room 이라는 계층이 있다.
  // // workspace = namespace, channel = room 으로 설계를 핡 것이다.
  // // 만약 끊는 것을 잘못하면 다른 워크스페이스나 채널로 갔는데 다른 메세지가 오거나 갈수도 있다.

  // # v2
  // console.log('rerender', workspace);
  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);
  if (!workspace) {
    return [undefined, disconnect];
  }
  if (!sockets[workspace]) {
    sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`, {
      transports: ['websocket'],
    });
  }

  // # v4
  // const disconnect = useCallback(() => {
  //   if (workspace) {
  //     sockets[workspace].disconnect();
  //     delete sockets[workspace];
  //   }
  // }, [workspace]);
  //
  // if (!workspace) {
  //   return [undefined, disconnect];
  //   // disconnect를 여기다 써야하는데 디스커넥터를 만드는 함수가 더 아래 있다.
  //   // 이럴땐 자바스크립트 스코프 지식이 필요한데 함수로 빼서..
  // }
  //
  // // 이게 없으면 리렌더링이 일어날때마다 연결이 맺어진다.
  // if (!sockets[workspace]) {
  //   sockets[workspace] = io(`${backUrl}/ws-${workspace}`, {
  //     transports: ['websocket'],
  //   });
  // }
  //
  // sockets[workspace].emit('hello', 'world');
  // sockets[workspace].on('message', (data) => {
  //   console.log(data);
  // });
  // sockets[workspace].on('data', (data) => {
  //   console.log(data);
  // });
  // sockets[workspace].on('onlineList', (data) => {
  //   console.log(data);
  // });
  //
  // // const disconnect = sockets[workspace].disconnect;
  //

  // ## return
  return [sockets[workspace], disconnect];
  // return [sockets[workspace], disconnect];
};

export default useSocket;

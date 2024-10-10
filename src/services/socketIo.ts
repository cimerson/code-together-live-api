import { Server, Socket } from 'socket.io'
import { ServerType } from '..'
import { createUserRoom, getAllUsers, getUsersforRoom, insertRoom } from './userRooms'



export const socketioService = (httpServer: ServerType): void => {

  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:5173/',
      credentials: true,
    }
  })


  const getConnectedUserIdList = async () => {
    let connectedUsers: string[] = [];
    let roomUsers: any[] = await io.in(`members`).fetchSockets();
    roomUsers.forEach((obj) => {
      connectedUsers.push(obj.request.user.id);
    });
    return connectedUsers;
  };

  const socketToRoom: Record<string, string> = {};
  const userInfoMap: any = {};

  interface User {
    id: string, username: string, roomId: string
  }

  io.on('connection', (socket) => {
    // console.log('socket connected', socket.id)

    socket.on('join-room', async (userInfo: User) => {
      // socket.emit("sid", socket.id);
      console.log(userInfo)
      const { roomId } = await userInfo

      // const userToRoom = {
      //   authorId: userId,
      //   bookId: roomId
      // }
      // await insertRoom(userToRoom)

      console.log(roomId)
      socketToRoom[socket.id] = roomId
      console.log(socketToRoom)
      userInfoMap[socket.id] = userInfo
      console.log(userInfoMap)
      const usersInRoom = io.sockets.adapter.rooms.get(roomId)?.size
      // adding people to rooms
      if (!usersInRoom || usersInRoom < 4) {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('new-user-joined', userInfoMap[socket.id])
      } else {
        socket.emit('room-full')
        return
      }

    })

  })

}
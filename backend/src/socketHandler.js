export const socketHandler = (io) => {
    io.on('connection', (socket) => {
  console.log("User connected", socket.id);

  // Simple message system
  socket.on('sendMessage', (data) => {
    console.log("Message received: ", data);
    // boradcast to all clients
    io.emit("receiveMessage", date);
});

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
});
}
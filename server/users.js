const users = [];

const addUser = ({id, name, room}) =>{
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => name===user.name && room === user.room);

    if(existingUser){
        return {
            error:'Username already taken'
        };
    }
    const user ={id, name, room};
    users.push(user);
    console.log(user)
    return { user }  
}

const removeUser = (id) =>{
    const index = users.findIndex((user) => id === user.id);

    if(index != -1){
        return users.splice(index, 1)[0];
    }  
}
const getUser = (id) => users.find((user) => id === user.id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = {addUser, removeUser, getUser, getUsersInRoom};
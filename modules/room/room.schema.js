const { gql } = require('apollo-server');
module.exports = typeDef = gql`
    type Room{
        _id:ID!
        roomName:String!
        hostID:String
        roomType:RoomTypeEnum
        description:String
        game:gameInfo
        member:[String]
        maxOfMember:Int
        createAt:Date
        code:String!
        roomLogo:String
        roomBackground:String
        countMember:Int
        isJoin:Boolean
        isRequest:Boolean
        isFindingMember:Boolean
    }
    type RoomAggregate{
        data:Room,
        additionData:AdditionData
        
    }
    type AdditionData{
        countMember:Int
        isJoin:Boolean
        isRequest:Boolean
    }
    type gameInfo{
        gameID:String!
        gameName:String!
    }
    type Blacklist{
        member:[String]
    }

   extend type Query{
        """
        *** Support paginate, page is number of page u want to show value, 
        limit is number of values in one page ***
        """
        getAllRoom(page:Int!,limit:Int!):[Room]
        getRoomInfo(roomID:String):Room
        searchRoom(query:String!,gameID:String,hideJoined:Boolean = true):[Room]
        getRoomCreateByUser:[Room]
        changeHost(oldHost:String!,newHost:String!):[Room]
        getRoomByGame(limit:Int!,page:Int!,gameID:String!,groupSize:GroupSize!,hideJoined:Boolean = true):[Room]
        getRoomJoin:[Room]
        getRoomMedia(roomID:String):[Media]
        inviteToRoom(roomID:String!):ResultCRUD
        roomManager:[Room]
        getAllRoomWithFinding:[Room]
        isRNTaken(name:String!):Boolean
        """ 
        ***Quản lý danh sách đen của group***
        """
        manageBlacklist(roomID:String!):Blacklist
   }
   type Mutation{
        changeGroupImage(groupID:String!,avatar:String!,cover:String!):ResultCRUD
        changeGroupPhoto(groupID:String!,type:GroupImage,url:String!):ResultCRUD
        RmvMbFrRoom(type:String!,memberID:String,roomID:String):ResultCRUD
        """
            ***Create  a room with 'input'***
        """
        createRoom(
            roomInput: RoomInput,needApproved:Boolean = false):ResultCRUD
         
        """
            ***Remove  a room,
            MUST specify roomID.
            userID is must to auth ***

        """
        removeRoom(roomID:ID!):ResultCRUD
        
        chatRoom(roomID:String!,messages:MessageInput):ResultCRUD
        joinRoom(roomID:String!,roomType:RoomTypeEnum!,code:String):ResultCRUD
        
        """ 
        ***Thay đổi thông tin phòng***
        """
        editRoom(roomID:ID!,newData:RoomInput):ResultCRUD
        
        """ 
        ***Thêm người vào phòng***
        """
        addMember(roomID:String!,memberID:String!):ResultCRUD
        removeMember(roomID:String!,memberID:String!):ResultCRUD
        leaveRoom(roomID:String!):ResultCRUD
        setFindingMember(roomID:String!):ResultCRUD
        joinRoomWithFinding(roomID:String!,userID:String!):ResultCRUD
   }
`
// type RoomMessage{
//     _id: ID
//     messageType: String
//     id: String
//     text: TextMessageType,
//     createAt: Date
// }
import groupConversationRepo from "@/ipc-wrappers/groupConversationRepositoryWrapper";
import personGroupRepo from "@/ipc-wrappers/personGroupRepositoryWrapper";
import groupMessageRepo from "@/ipc-wrappers/groupMessageRepositoryWrapper";
import GroupConversation from "@/backend/models/groupConversation";
import PersonGroup from "@/backend/models/personGroup";
import Store from "@/store/index";
import cryptionService from "./cryptionService";
import userService from "./userService";
import personService from "./personService";
import groupMessageService from "./groupMessageService";

const getGroupMembersOfGroup = async (groupConversationId) => {
  try {
    console.log("Get group members of group:", groupConversationId);
    let personGroups =
      await personGroupRepo.getPersonGroupsByGroupConversationId(
        groupConversationId
      );
    let members = [];
    for (const personGroup of personGroups) {
      let personData = await personService.getPersonById(personGroup.personId);
      members.push({
        isOnline: false,
        name: personData.name,
        email: personData.email,
        publicKey: personData.publicKey,
        isAdmin: personGroup.isAdmin == 1 ? true : false,
      });
    }
    return members;
  } catch (err) {
    console.log(err);
    throw new Error("Get group members of group failed!");
  }
};
const newGroupMemberJoined = async (groupId, personData) => {
  try {
    let person = await personService.findPersonByEmail(personData.email);
    if (person == null) person = await personService.createPerson(personData);
    let groupConversation = await findGroupConversationByGroupIdOfUser(groupId);
    await personGroupRepo.insertPersonGroup({
      groupConversationId: groupConversation.id,
      personId: person.id,
      isAdmin: 0,
    });
  } catch (err) {
    console.log(err);
    throw new Error("New group member joined failed!");
  }
};
const joinGroupConversation = async (userId, groupData, members) => {
  try {
    console.log("Join group:", groupData);
    console.log("Members:", members);
    let groupConversation = GroupConversation.groupConversationModel;
    groupConversation.groupId = groupData.groupId;
    groupConversation.userId = userId;
    groupConversation.name = groupData.name;
    groupConversation.description = groupData.description;
    groupConversation.groupKey = groupData.groupKey;

    let groupChat = await groupConversationRepo.insertGroupConversation(
      groupConversation
    );
    let personGroupData = PersonGroup.personGroupModel;
    personGroupData.groupConversationId = groupChat.id;
    personGroupData.personId = (await userService.findUser(userId)).personId;
    personGroupData.isAdmin = 0;
    await personGroupRepo.insertPersonGroup(personGroupData);
    for (const member of members) {
      let person = await personService.findPersonByEmail(member.email);
      if (person == null) person = await personService.createPerson(member);
      personGroupData.personId = person.id;
      personGroupData.isAdmin = member.isAdmin ? 1 : 0;
      console.log("Insert member:", personGroupData);
      await personGroupRepo.insertPersonGroup(personGroupData);
    }

    Store.dispatch("addConversation", await formatGroupConversation(groupChat));
    console.log(
      "Group conversation created:",
      await formatGroupConversation(groupChat)
    );
  } catch (err) {
    console.log(err);
    throw new Error("Join group conversation failed!");
  }
};
const getGroupConversationById = async (id) => {
  try {
    return await groupConversationRepo.findGroupConversationById(id);
  } catch (err) {
    console.log(err);
    throw new Error("Get group conversation by id failed!");
  }
};
const findGroupConversationByGroupIdOfUser = async (groupId) => {
  try {
    return await groupConversationRepo.findGroupConversationByGroupIdOfUser({
      userId: Store.getters.user.id,
      groupId: groupId,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Get group conversation by group failed!");
  }
};
const createGroupChat = async (userId, groupData) => {
  try {
    console.log("Group chat creating...", {
      ...groupData,
      userId: userId,
    });

    let groupConversation = GroupConversation.groupConversationModel;
    groupConversation.groupId = groupData.groupId;
    groupConversation.userId = userId;
    groupConversation.name = groupData.name;
    groupConversation.description = groupData.description;
    groupConversation.groupKey = await cryptionService.generateKey();

    let groupChat = await groupConversationRepo.insertGroupConversation(
      groupConversation
    );
    let personGroupData = PersonGroup.personGroupModel;
    personGroupData.groupConversationId = groupChat.id;
    personGroupData.personId = (await userService.findUser(userId)).personId;
    personGroupData.isAdmin = 1;
    await personGroupRepo.insertPersonGroup(personGroupData);

    Store.dispatch("addConversation", await formatGroupConversation(groupChat));
    console.log(
      "Group conversation created:",
      await formatGroupConversation(groupChat)
    );
  } catch (err) {
    console.log(err);
    throw new Error("Group creation failed!");
  }
};
const formatGroupConversation = async (conversation, groupIndex) => {
  let lastMessageInfo = await getLastMessageDetailsOfChat(conversation.id);
  let index =
    groupIndex ??
    Store.getters.getGroupConversationById(conversation.id)?.index ??
    Store.getters.conversations.length;
  return {
    index: index,
    conversationId: conversation.id,
    groupId: conversation.groupId,
    name: conversation.name,
    description: conversation.description,
    groupKey: conversation.groupKey,
    isActive: false,
    lastMessageTimestamp: lastMessageInfo?.date ?? "",
    lastMessage: lastMessageInfo?.message ?? "",
    isFav: conversation.isFavorite,
    conversationType: "Group",
  };
};

const getLastMessageDetailsOfChat = async (groupConversationId) => {
  console.log("Get last message detail of group chat:", groupConversationId);
  return await groupMessageRepo.getLastGroupMessageByGroupConversationId(
    groupConversationId
  );
};
const getAllGroupConversationsOfUser = async (userId) => {
  return await groupConversationRepo.getGroupConversationsByUserId(userId);
};
const setFavoriteOfChat = async (contactConversationId, isFavorite) => {
  await groupConversationRepo.setFavoriteOfGroupConversation({
    id: contactConversationId,
    isFavorite: isFavorite,
  });
};

const deleteGroup = async (groupConversationId) => {
  try {
    console.log("Deleting group: ID", groupConversationId);
    await groupConversationRepo.deleteGroupConversation(groupConversationId);
    let index =
      Store.getters.getGroupConversationById(groupConversationId).index;
    await Store.dispatch("deleteConversation", index);
  } catch (err) {
    console.log("Group deletion failed!", err);
  }
};
// const getGroupConversation = async (groupConversationId) => {
//   return groupConversationRepo.findGroupConversationById(groupConversationId);
// };
const dispatchNewMessage = async (groupConversationId, messageData) => {
  console.log("Dispatch new Mesage:", messageData);
  await dispatchLastMessageDetail(groupConversationId);
  Store.dispatch("addMessage", messageData);
};
const dispatchLastMessageDetail = async (groupConversationId) => {
  let lastMessageDetail = await getLastMessageDetailsOfChat(
    groupConversationId
  );
  console.log("Dispatch last msg detail:", lastMessageDetail);
  let payload = {
    conversationIndex:
      Store.getters.getGroupConversationById(groupConversationId).index,
    lastMessageTimestamp: lastMessageDetail?.date ?? "",
    lastMessage: lastMessageDetail?.message ?? "",
  };
  console.log("Dispatch last message detail:", payload);
  Store.dispatch("setLastMessageDetailOfConversation", payload);
};
// const getGroupConversation = async (groupConversationId) => {
//   return groupConversationRepo.findGroupConversationById(groupConversationId);
// };
const addMessageToChat = async (messageData) => {
  try {
    // let conversation = await getGroupConversation(
    //   messageData.groupConversationıd
    // );
    let senderId = messageData.senderPersonId;
    console.log("Add message to chat senderId:", senderId);
    let senderPublicKey = (await personService.getPersonById(senderId))
      .publicKey;
    await groupMessageService.addMessage(messageData, senderPublicKey);
    await dispatchLastMessageDetail(messageData.groupConversationId);
  } catch (err) {
    console.log("Add message to chat failed!", err);
  }
};
export default {
  addMessageToChat,
  dispatchNewMessage,
  joinGroupConversation,
  getGroupConversationById,
  findGroupConversationByGroupIdOfUser,
  getGroupMembersOfGroup,
  newGroupMemberJoined,
  createGroupChat,
  getLastMessageDetailsOfChat,
  getAllGroupConversationsOfUser,
  setFavoriteOfChat,
  formatGroupConversation,
  deleteGroup,
};

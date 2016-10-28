export default function getUser(userId, users) {
  return userId === 'default' ? users[0] : users.find(u => u.id === +userId);
}

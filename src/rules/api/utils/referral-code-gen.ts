const tokenLength = 8;

const characters =
  'abcdefghijklmnopqrstuvwxyz123456789';

export const referralCodeGen = () => {
  let token = '';

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
};

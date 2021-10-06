jest.mock('../models/');
const { User } = require('../models');
const { validation } = require('./conUser');

test('입력한 닉네임은  최소2자 이하면 회원가입 실패여야한다..', async () => {
  const mockedsend = jest.fn();
  const req = {
    body: {
      nickname: 'st',
      password: '1234',
      passwordConfirm: '1234',
    },
  };
  const res = {
    send: mockedsend,
  };
  await User.findOne.mockReturnValue(null);
  await validation(req, res);
  expect(mockedsend).toBeCalledWith({ result: '회원가입실패' });
});

test('입력한 닉네임은  최소2자 이면 회원가입 실패여야한다..', async () => {
  const mockedsend = jest.fn();
  const req = {
    body: {
      nickname: 'str',
      password: '1234',
      passwordConfirm: '1234',
    },
  };
  const res = {
    send: mockedsend,
  };
  await User.findOne.mockReturnValue(null);
  await validation(req, res);
  expect(mockedsend).toBeCalledWith({ result: '회원가입성공' });
});

test('닉네임은 알파벳 대소문자(A~Z,a~z),숫자 0~9로 이루어져있다.', async () => {
  const mockedsend = jest.fn();
  const req = {
    body: {
      nickname: 'strAS09123',
      password: '4567',
      passwordConfirm: '4567',
    },
  };
  const res = {
    send: mockedsend,
  };
  await User.findOne.mockReturnValue(null);
  await validation(req, res);
  expect(mockedsend).toBeCalledWith({ result: '회원가입성공' });
});

test('닉네임은 알파벳 대소문자(A~Z,a~z),숫자 0~9로 이루어져있다.', async () => {
  const mockedsend = jest.fn();
  const req = {
    body: {
      nickname: 'strAS09123--',
      password: '1234',
      passwordConfirm: '1234',
    },
  };
  const res = {
    send: mockedsend,
  };
  await User.findOne.mockReturnValue(null);
  await validation(req, res);
  expect(mockedsend).toBeCalledWith({ result: '회원가입실패' });
});

test('비밀번호는 최소 4자 이상이며,닉네임과 같은 값이 포함된경우 회원가입 실패', async () => {
  const mockedsend = jest.fn();
  const req = {
    body: {
      nickname: 'strAS0',
      password: '123',
      passwordConfirm: '123',
    },
  };
  const res = {
    send: mockedsend,
  };
  await User.findOne.mockReturnValue(null);
  await validation(req, res);
  expect(mockedsend).toBeCalledWith({ result: '회원가입실패' });
});

test('비밀번호는 최소 4자 이상이며,닉네임과 같은 값이 포함된경우 회원가입 실패', async () => {
  const mockedsend = jest.fn();
  const req = {
    body: {
      nickname: 'strAS0',
      password: '1230',
      passwordConfirm: '1230',
    },
  };
  const res = {
    send: mockedsend,
  };
  await User.findOne.mockReturnValue(null);
  await validation(req, res);
  expect(mockedsend).toBeCalledWith({ result: '회원가입실패' });
});

test('비밀번호와 비밀번호 확인 같지 않으면 회원가입 실패', async () => {
  const mockedsend = jest.fn();
  const req = {
    body: {
      nickname: 'stravinest',
      password: '1234',
      passwordConfirm: '1230',
    },
  };
  const res = {
    send: mockedsend,
  };
  await User.findOne.mockReturnValue(null);
  await validation(req, res);
  expect(mockedsend).toBeCalledWith({ result: '회원가입실패' });
});

test('비밀번호와 비밀번호 확인 같지 않으면 회원가입 실패', async () => {
  const mockedsend = jest.fn();
  const req = {
    body: {
      nickname: 'stravinest',
      password: '1234asd',
      passwordConfirm: '1230asd',
    },
  };
  const res = {
    send: mockedsend,
  };
  await User.findOne.mockReturnValue(null);
  await validation(req, res);
  expect(mockedsend).toBeCalledWith({ result: '회원가입실패' });
});

test('비밀번호와 비밀번호 확인 같으면 회원가입 성공', async () => {
  const mockedsend = jest.fn();
  const req = {
    body: {
      nickname: 'stravinest',
      password: '1234d',
      passwordConfirm: '1234d',
    },
  };
  const res = {
    send: mockedsend,
  };
  await User.findOne.mockReturnValue(null);
  await validation(req, res);
  expect(mockedsend).toBeCalledWith({ result: '회원가입성공' });
});

test('데이터베이스에 존재하는 닉네임을 입력하면 "중복된닉네임입니다."발생한다', async () => {
  const mockedsend = jest.fn();
  const req = {
    body: {
      nickname: 'stravinest',
      password: '1234d',
      passwordConfirm: '1234d',
    },
  };
  const res = {
    send: mockedsend,
  };
  await User.findOne.mockReturnValue();
  await validation(req, res);
  expect(mockedsend).toBeCalledWith({  errorMessage:'중복된 아이디 입니다.' });
});

// test('입력한 닉네임은 알파벳 대소문자(a~z,A~Z) 숫자0~9 로 구성된다.', async () => {
//   User.findOne = jest.fn();
//   const mockedsend = jest.fn();
//   const req = {
//     body: {
//       nickname: 'stravinesASDt0123',
//       password: '1234',
//       passwordConfirm: '1234',
//     },
//   };
//   const res = {
//     status: () => ({
//       send: mockedsend,
//     }),
//   };
//   await User.findOne.mockReturnValue(null);
//   await validation(req, res);
//   expect(User.create).toHaveBeenCalledTimes(1);
// });

// test('입력한 닉네임은 알파벳 대소문자(a~z,A~Z) 숫자0~9 로 구성된다.', async () => {
//   User.findOne = jest.fn();
//   const mockedsend = jest.fn();
//   const req = {
//     body: {
//       nickname: '-!@#',
//       password: '1234',
//       passwordConfirm: '1234',
//     },
//   };
//   const res = {
//     status: () => ({
//       send: mockedsend,
//     }),
//   };
//   await User.findOne.mockReturnValue(null);
//   await validation(req, res);
//   expect(User.create).toHaveBeenCalledTimes(1);
// });
// //

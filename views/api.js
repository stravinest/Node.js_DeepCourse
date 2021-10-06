function getSelf(callback) {
  $.ajax({
    type: 'GET',
    url: '/api/users/me',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    success: function (response) {
      callback(response.user);
    },
    error: function (xhr, status, error) {
      alert('로그인이 필요합니다.');
      window.location.href = '/';
    },
  });
}

function signOut() {
  localStorage.clear();
  alert('로그아웃!');
  window.location.href = '/';
}

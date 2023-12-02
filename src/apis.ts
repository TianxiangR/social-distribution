
import Cookie from 'universal-cookie';
import { AuthorInfo, PostBase } from './types';
const base_url = 'http://localhost:8000';
// const base_url = 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com';

export function getTokenFromCookie() {
  const cookie = new Cookie();
  return cookie.get('token');
}

export function setTokenToCookie(token: string) {
  const cookie = new Cookie();
  cookie.set('token', token);
}

export async function login(username: string, password: string) {
  return await fetch(base_url + '/api/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    mode: 'cors',
  });
}

export async function signup(body: object) {
  return await fetch(base_url + '/api/signup/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    mode: 'cors',
  });

}

export async function getPostList() {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/posts/', {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
}

export async function getPostById(id: string) {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/posts/' + id, {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
}

export async function likePost(id: string) {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/posts/' + id + '/likes', {
    method: 'POST',
    headers: {
      Authorization: 'Token ' + token,
    },
  });
}

export async function createPost(body: Omit<PostBase, 'id'>) {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/posts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + token,
    },
    body: JSON.stringify({ ...body}),
  });
}


export async function createComment(postId: string, comment: string) {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/posts/' + postId + '/comments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + token,
    },
    body: JSON.stringify({ comment }),
  });
}

export async function likeComment(postId: string, commentId: string) {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/posts/' + postId + '/comments/' + commentId + '/likes', {
    method: 'POST',
    headers: {
      Authorization: 'Token ' + token,
    },
  });
}

export async function getFollowing() {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/followings/', {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
}

export async function getFollowers() {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/followers/', {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
}

export async function unfollow(id: string) {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/followings/', {
    method: 'DELETE',
    headers: {
      Authorization: 'Token ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ target: id }),
  });
}

export async function follow(id: string) {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/follows', {
    method: 'PUT',
    headers: {
      Authorization: 'Token ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ target: id }),
  });
}

export async function getFriends(){
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/follows?type=friends', {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
}

export async function updatePost(id: string, body: Partial<PostBase>) {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/posts/' + id, {
    method: 'PATCH',
    headers: {
      Authorization: 'Token ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...body }),
  });
}

export async function deletePost(id: string) {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/posts/' + id, {
    method: 'DELETE',
    headers: {
      Authorization: 'Token ' + token,
    },
  });
}

export async function getUserList() {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/authors/', {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
}

export async function getNotificationList() {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/notifications', {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
}

export async function updateNotification(id: string, body: unknown){
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/notifications/' + id, {
    method: 'PATCH',
    headers: {
      Authorization: 'Token ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export async function makeFriendRequest(target: AuthorInfo) {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/friend-requests/', {
    method: 'POST',
    headers: {
      Authorization: 'Token ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(target),
  });
}


export async function getFriendRequestList() {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/friend-requests/', {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
}

export async function acceptFriendRequest(id: string) {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/friend-requests/' + id, {
    method: 'PATCH',
    headers: {
      Authorization: 'Token ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 'ACCEPTED' }),
  });
}


export async function rejectFriendRequest(id: string) {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/friend-requests/' + id, {
    method: 'PATCH',
    headers: {
      Authorization: 'Token ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 'REJECTED' }),
  });
}


export async function getProfile(){
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/my-profile', {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
}

export async function updateProfile(body: object){
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/my-profile', {
    method: 'PATCH',
    headers: {
      Authorization: 'Token ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
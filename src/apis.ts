
import Cookie from 'universal-cookie';
import { TPost } from './types';
const base_url = 'http://localhost:8000';

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

export async function createPost(body: TPost) {
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

export async function createComment(postId: string, content: string) {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/posts/' + postId + '/comments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + token,
    },
    body: JSON.stringify({ content }),
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
  return await fetch(base_url + '/api/follows?type=following', {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
}

export async function getFollowers() {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/follows?type=followers', {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
}

export async function unfollow(id: string) {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/follows', {
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

export async function updatePost(id: string, body: TPost) {
  const token = getTokenFromCookie();
  return await fetch(base_url + '/api/posts/' + id, {
    method: 'PUT',
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
  return await fetch(base_url + '/api/authors', {
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
    },
    body: JSON.stringify(body),
  });
}

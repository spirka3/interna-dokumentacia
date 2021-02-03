// components/WithCustomHook.js
import React from 'react';
import UseDataApi from './hooks/UseDataApi';
import PostsList from './PostsList';

const POSTS_SERVICE_URL = 'https://jsonplaceholder.typicode.com/posts';

function WithHooks() {
  const [dataState] = UseDataApi(POSTS_SERVICE_URL);

  return (
    <PostsList
      data={dataState.data.slice(0, 5)}
      isFetching={dataState.isFetching}
    />
  );
}

export default WithHooks;

// https://nordschool.com/react-data-fetching/
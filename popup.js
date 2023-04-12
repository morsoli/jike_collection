// 获取按钮元素
const fetchBtn = document.getElementById('fetchBtn');
// 获取显示收藏内容的列表元素
const collectionList = document.getElementById('collectionList');

// 添加按钮点击事件监听器
fetchBtn.addEventListener('click', async () => {
    try {
    // 发送请求获取 x-jike-access-token
    const token = await fetchAccessToken();
    // 发送请求获取用户的收藏内容
    const collections = await fetchCollections(token);
    console.log(collections);
    // 渲染收藏内容到列表中
    renderCollections(collections);
    } catch (error) {
        console.error(error);
        }
});

// 获取 x-jike-access-token
async function fetchAccessToken() {
    // 发送请求获取 cookie
    const cookies = await new Promise((resolve) => {
    chrome.cookies.get({
    url: 'https://okjike.com',
    name: 'x-jike-access-token'
    }, (cookie) => {
    resolve(cookie);
    });
    });
    
    // 如果获取到了 cookie，则返回其值，否则抛出错误
    if (cookies && cookies.value) {
    return cookies.value;
    } else {
    throw new Error('Failed to fetch x-jike-access-token');
    }
    }

    // 发送请求获取用户的收藏内容
async function fetchCollections(token) {
    // 构建请求体
    const body = JSON.stringify({
        operationName: "UserCollections",
        variables: {},
        query: "query UserCollections($loadMoreKey: JSON) {\n  viewer {\n    collections(loadMoreKey: $loadMoreKey) {\n      ...BasicFeedItem\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment BasicFeedItem on FeedsConnection {\n  pageInfo {\n    loadMoreKey\n    hasNextPage\n    __typename\n  }\n  nodes {\n    ... on ReadSplitBar {\n      id\n      type\n      text\n      __typename\n    }\n    ... on MessageEssential {\n      ...FeedMessageFragment\n      __typename\n    }\n    ... on UserAction {\n      id\n      type\n      action\n      actionTime\n      ... on UserFollowAction {\n        users {\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          __typename\n        }\n        allTargetUsers {\n          ...TinyUserFragment\n          following\n          statsCount {\n            followedCount\n            __typename\n          }\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          __typename\n        }\n        __typename\n      }\n      ... on UserRespectAction {\n        users {\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          __typename\n        }\n        targetUsers {\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          ...TinyUserFragment\n          __typename\n        }\n        content\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment FeedMessageFragment on MessageEssential {\n  ...EssentialFragment\n  ... on OriginalPost {\n    ...LikeableFragment\n    ...CommentableFragment\n    ...RootMessageFragment\n    ...UserPostFragment\n    ...MessageInfoFragment\n    isPrivate\n    pinned {\n      personalUpdate\n      __typename\n    }\n    __typename\n  }\n  ... on Repost {\n    ...LikeableFragment\n    ...CommentableFragment\n    ...UserPostFragment\n    ...RepostFragment\n    isPrivate\n    pinned {\n      personalUpdate\n      __typename\n    }\n    __typename\n  }\n  ... on Question {\n    ...UserPostFragment\n    __typename\n  }\n  ... on OfficialMessage {\n    ...LikeableFragment\n    ...CommentableFragment\n    ...MessageInfoFragment\n    ...RootMessageFragment\n    __typename\n  }\n  __typename\n}\n\nfragment EssentialFragment on MessageEssential {\n  id\n  type\n  content\n  shareCount\n  repostCount\n  createdAt\n  collected\n  pictures {\n    format\n    watermarkPicUrl\n    picUrl\n    thumbnailUrl\n    smallPicUrl\n    width\n    height\n    __typename\n  }\n  urlsInText {\n    url\n    originalUrl\n    title\n    __typename\n  }\n  __typename\n}\n\nfragment LikeableFragment on LikeableMessage {\n  liked\n  likeCount\n  __typename\n}\n\nfragment CommentableFragment on CommentableMessage {\n  commentCount\n  __typename\n}\n\nfragment RootMessageFragment on RootMessage {\n  topic {\n    id\n    content\n    __typename\n  }\n  __typename\n}\n\nfragment UserPostFragment on MessageUserPost {\n  readTrackInfo\n  user {\n    ...TinyUserFragment\n    __typename\n  }\n  __typename\n}\n\nfragment TinyUserFragment on UserInfo {\n  avatarImage {\n    thumbnailUrl\n    smallPicUrl\n    picUrl\n    __typename\n  }\n  isSponsor\n  username\n  screenName\n  briefIntro\n  __typename\n}\n\nfragment MessageInfoFragment on MessageInfo {\n  video {\n    title\n    type\n    image {\n      picUrl\n      __typename\n    }\n    __typename\n  }\n  linkInfo {\n    originalLinkUrl\n    linkUrl\n    title\n    pictureUrl\n    linkIcon\n    audio {\n      title\n      type\n      image {\n        thumbnailUrl\n        picUrl\n        __typename\n      }\n      author\n      __typename\n    }\n    video {\n      title\n      type\n      image {\n        picUrl\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment RepostFragment on Repost {\n  target {\n    ...RepostTargetFragment\n    __typename\n  }\n  targetType\n  __typename\n}\n\nfragment RepostTargetFragment on RepostTarget {\n  ... on OriginalPost {\n    id\n    type\n    content\n    pictures {\n      thumbnailUrl\n      __typename\n    }\n    topic {\n      id\n      content\n      __typename\n    }\n    user {\n      ...TinyUserFragment\n      __typename\n    }\n    __typename\n  }\n  ... on Repost {\n    id\n    type\n    content\n    pictures {\n      thumbnailUrl\n      __typename\n    }\n    user {\n      ...TinyUserFragment\n      __typename\n    }\n    __typename\n  }\n  ... on Question {\n    id\n    type\n    content\n    pictures {\n      thumbnailUrl\n      __typename\n    }\n    user {\n      ...TinyUserFragment\n      __typename\n    }\n    __typename\n  }\n  ... on Answer {\n    id\n    type\n    content\n    pictures {\n      thumbnailUrl\n      __typename\n    }\n    user {\n      ...TinyUserFragment\n      __typename\n    }\n    __typename\n  }\n  ... on OfficialMessage {\n    id\n    type\n    content\n    pictures {\n      thumbnailUrl\n      __typename\n    }\n    __typename\n  }\n  ... on DeletedRepostTarget {\n    status\n    __typename\n  }\n  __typename\n}\n"
    });
    
    // 发送 POST 请求
    const response = await fetch('https://web-api.okjike.com/api/graphql', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'x-jike-access-token': token,
    },
    body: body
    });
    
    // 解析响应的 JSON 数据
    const data = await response.json();
    
    // 深度遍历获取收藏内容列表
    const collections = data?.data?.viewer?.collections?.nodes || [];
    
    return collections;
    }
    
// 渲染收藏内容到列表中
function renderCollections(collections) {
    // 清空列表
    collectionList.innerHTML = '';

    // 生成 Markdown 文本
    let markdown = '';
    // 获取当前时间
    const currentTime = new Date().toLocaleString();

    // 添加剪存时间和文档生成信息
    markdown = `⏰ 剪存时间：${currentTime} (UTC+8)\n` +
            `✂️ 本文档由 即刻剪存 一键生成\n\n` +
            markdown;
    collections.forEach((collection, index) => {
    const linkInfo = getContentLink(collection);
    const pictureInfo = getPicture(collection);
    markdown += `## ${index + 1}. [🔗 原文链接](https://web.okjike.com/originalPost/${collection.id})\n` +
        `${collection.content}\n` +
        `${pictureInfo}\n` +
        `${linkInfo}\n`;
    });

    // 创建并下载 Markdown 文件
    const filename = '即刻剪存.md';
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(markdown));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

function  getContentLink(collection){
    let linkinfo = collection?.linkInfo?.linkUrl || "";
    if (linkinfo.trim() === ""){
        return ``;
    }else{
        return `外部链接:${linkinfo}`;
    }
}

function getPicture(collection){
    let pictures = collection.pictures;
    if (Array.isArray(pictures) && pictures.length === 0) {
        return ``;
    }
    let pictureInfos="";
    pictures.forEach(picture => {
        pictureInfos += `![图片描述](${picture.picUrl})`
    });
    return `${pictureInfos}`;
}
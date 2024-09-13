import { Helmet } from 'react-helmet-async';

import { useParams } from 'react-router-dom';

import ChatView from 'src/sections/chat/view/chat-view';



// ----------------------------------------------------------------------

export default function ChatPage() {
  const { requestId, userId } = useParams();
  

  return (
    <>
      <Helmet>
        <title> Chat | BugNet Core 🐞 </title>
      </Helmet>

      <ChatView requestId={requestId} userId={userId} />
    </>
  );
}

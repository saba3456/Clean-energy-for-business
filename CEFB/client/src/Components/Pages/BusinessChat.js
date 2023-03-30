import '../CSSContents/BusinessChat.css'
import React, {useState, useEffect, useRef} from "react";
import io from 'socket.io-client';
import axios from 'axios'

function BusinessChat(){

    document.title = "Business Chat";
    const username = JSON.parse(localStorage.getItem('username'));
    const radarChatUser = JSON.parse(localStorage.getItem('radarChatUsername')); //radar - chat button clicked user
    const [userChats, setUserChats] = useState({});
    const [uniqueChats, setUniqueChats] = useState([]);
    const [currentChats, setCurrentChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [update, setUpdate] = useState(false);

    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io('http://localhost:5000', {
          query: {
            userId: username,
          },
        });
        socketRef.current.on('message', (messageT) => {
          const chatFrom = messageT.chatFrom;
          if (!uniqueChats.includes(chatFrom)) {
            setUniqueChats((uniqueData) => [...uniqueData, chatFrom]);
          }
          setUserChats((chatData) => ({
            ...chatData,
            [chatFrom]: [...(chatData[chatFrom] || []), messageT],
          }));
          setUpdate(true);
        });
        return () => {
            socketRef.current.disconnect();
        };
      }, [username, uniqueChats]);

    useEffect(() => {
        axios.get(`http://localhost:4000/businesschat/getAllMessages/${username}`)
            .then((response) => {
                if (response.data) {
    
                    const newChats = {};
                    const newUniqueChats = [];
    
                    response.data.forEach(messageObj => {
                        const {chatID, chatTo, chatFrom, message} = messageObj;
                        let user = null;
                        if(chatTo === username){ // user received message "chatFrom is the query"
                            user = chatFrom;
                        }else{ // user sent message
                            user = chatTo;
                        }
    
                        if(!newChats[user]){
                            newChats[user] = [{chatFrom, message}];
                            newUniqueChats.push(user);
                            
                        }else{
                            newChats[user].push({chatFrom, message});
                        }
                    });
                    
                    if(radarChatUser !== null){
                        if(!newUniqueChats.includes(radarChatUser)){
                            newUniqueChats.push(radarChatUser);
                            newChats[radarChatUser] = [];
                        }
                    }

                    newUniqueChats.reverse();
                    setUserChats(newChats);
                    setUniqueChats(newUniqueChats);
                    setLoading(false);
                    
                }
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const onChatSelect = (user) => {
        setSubmitEnabled(true);
        setSelectedChat(user);
        setCurrentChats(userChats[user])

    }

    function onInputChange(e){
        if(submitEnabled){
            setMessageInput(e.target.value)
        }
    }

    function onInputSubmit(){
        if(submitEnabled){
            setSubmitEnabled(false);
            console.log(messageInput);
            if(selectedChat !== null && messageInput !== '' && messageInput.length <= 144){// not empty, less than 145 characters
                const msg = {
                    chatFrom: username,
                    chatTo: selectedChat,
                    message: messageInput
                };
                console.log(msg);
                axios.post('http://localhost:4000/businesschat/sendMessage', msg)
                    .then((response) => {
                        if (response.data === 'Message sent') {
                            setUserChats(chatData => ({
                                ...chatData,
                                [selectedChat]: [...(chatData[selectedChat] || []), {chatFrom: msg.chatFrom, message: msg.message}]
                            }));
                            setUpdate(true);
                            setMessageInput('');
                            setSubmitEnabled(true);
                            socketRef.current.emit('message', msg);
                        }
                })

            }else{
                setSubmitEnabled(true);
            }
        }
    }

    useEffect(() => {
        if (update) {
            setCurrentChats(userChats[selectedChat]);
            setUpdate(false);
        }else{
            const chatContainer = document.querySelector('.chatbox-background');
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, [update]);
    
    return (
        <div className='BusinessChat'> 
            <div className='chatselect-background'> 
                <div className='chats'>Users</div>
                <br></br>
                {loading ? (<div>Loading...</div>) : (
                    uniqueChats.map(user => (
                        <button className='chatselect-button' onClick={() => onChatSelect(user)}>{user}</button>
                    ))
                )}
                <br></br>
            </div>
            <div className='chatbox-container'>
                {selectedChat && <div className='selected-user'>{selectedChat}</div>}
                <div className='chatbox-background'>
                    {selectedChat ? 
                        currentChats.map(msg => (
                        <div className={`message ${msg.chatFrom === selectedChat ? 'received' : 'sent'}`}>
                            <div className='message-name'>{msg.chatFrom}</div>
                            <div className='message-text'>{msg.message}</div>
                        </div>
                    )) : ("Select a chat")}
                </div>
                <input type="text" class='message-input' value={messageInput} maxLength='144' placeholder="Enter your message..." onChange={onInputChange}/>
                <button onClick={onInputSubmit}>Send</button>
            </div>
        </div>
    );
}


export default BusinessChat;
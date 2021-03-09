import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import db from '../firebase';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { useParams } from 'react-router';
import firebase from 'firebase';

const Chat = ({ user, isDark }) => {

    let { channelId } = useParams();
    const [channel, setChannel] = useState();
    const [messages, setMessages] = useState([]);

    const getMessages = () => {
        db.collection('rooms')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
            let messages = snapshot.docs.map((doc) => doc.data());
            // console.log(messages);
            setMessages(messages);
        })
    }

    const sendMessage = (text) => {
        if(channelId) {
            let payload = {
                text: text,
                timestamp: firebase.firestore.Timestamp.now(),
                user: user.name,
                userImage: user.photo, 
            }
            db.collection('rooms').doc(channelId).collection('messages').add(payload);
        }
    }

    const getChannel = () => {
        db.collection('rooms')
        .doc(channelId)
        .onSnapshot((snapshot) => {
            setChannel(snapshot.data());
        });
    }

    useEffect(() => {
        getChannel();
        getMessages();
        console.log(messages);
    }, [channelId]);

    return (
        <Container>
            <Header isDark={isDark}>
                <Channel isDark={isDark}>
                    <ChannelName>
                        # {channel && channel.name}
                    </ChannelName>
                    <ChannelInfo>
                        Company-wide announcements and work-based matters
                    </ChannelInfo>
                </Channel>
                <ChannelDetails isDark={isDark}>
                    <div>
                        Details
                    </div>
                    <Info />
                </ChannelDetails>
            </Header>
            <MessageContainer isDark={isDark}>
                {
                    messages.length > 0 && 
                    messages.map((data) => (
                        <ChatMessage
                            text={data.text}
                            name={data.user}
                            image={data.userImage}
                            timestamp={data.timestamp}
                            userLoggedIn={user.name}
                        />
                    ))
                }
            </MessageContainer>
            <ChatInput sendMessage={sendMessage} isDark={isDark} />
        </Container>
    )
}

export default Chat;

const Container = styled.div `
    display: grid;
    grid-template-rows: 64px auto min-content;
    min-height: 0;
`

const Header = styled.div `
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    border-bottom: ${({ isDark }) => (isDark ? '1px solid rgb(104, 74, 104)' : '1px solid rgba(83, 39, 83, .13)')};
    justify-content: space-between;
`

const MessageContainer = styled.div `
    color: ${({ isDark }) => (isDark ? 'white' : 'black')};
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`

const Channel = styled.div `
    color: ${({ isDark }) => (isDark ? 'white' : 'black')};
`

const ChannelDetails = styled.div `
    display: flex;
    align-items: center;
    color: ${({ isDark }) => (isDark ? 'white' : '#606060')};
`

const ChannelName = styled.div `
    font-weight: 700;
`
const ChannelInfo = styled.div `
    font-weight: 400;
    color: #606060;
    font-size: 14px;
    margin-top: 8px;
`

const Info = styled(InfoOutlinedIcon) `
    margin-left: 10px;
    cursor: pointer;
`